import { map, switchMap, filter, scan, debounceTime, timeInterval } from "rxjs"
import { combineEpics, ofType } from "redux-observable"
import { Epic } from "@/redux/store/index.js"
import { captureException } from "@sentry/nextjs"

import { actions, selectors, UpsertedAnswerPayload } from "@/redux/slices/participation/answers.js"
import { sdk } from "@/api/gql-client.js"
import { CreateAnswerMutation, UpdateAnswerMutation } from "@/api/graphql/sdk.generated.js"

const DEBOUNCE_TIME = 3000

// Initialize pages-visited upon init
const upsertAnswersEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    filter((action) => action.payload.questionId),
    map((action) => action.payload),
    timeInterval(),
    scan((acc, payload) => {
      const { value, interval } = payload
      // After the same interval as the debounced time, we reset the accumulator
      if (interval > DEBOUNCE_TIME) acc = {}

      // @ts-ignore : we are sure we have a questionId, see "filter" above the chain
      acc[value.questionId] = value.value
      return acc
    }, {}),
    debounceTime(DEBOUNCE_TIME),
    switchMap(async (accu) => {
      // If preview mode, we don't save anything
      const mode = state$.value.participation.status.mode
      if (mode === "preview") return []

      const participationId = state$.value.participation.status.participationId
      if (!participationId) {
        captureException(new Error("Missing participation ID to save answers !"))
        return []
      }

      const allUpserts: Promise<CreateAnswerMutation & UpdateAnswerMutation>[] = Object.entries(accu).map(
        async ([qId, value]) => {
          const answerInState = selectors.selectById(state$.value, qId)

          // Wrap string so it doesn't crash in the backend (STRAPI, JSON, toussa)
          if (typeof value === "string") {
            value = { answer: value }
          }

          // Create or update, depending on the presence of an Answer ID
          try {
            return answerInState?.id
            ? sdk.updateAnswer({ id: answerInState.id, data: { value } })
            : sdk.createAnswer({ data: { value, question: qId, participation: participationId } })            
          } catch (e) {
            captureException(e, { extra: { participationId, question: qId } })
            return Promise.reject(e)
          }
        }
      )

      return Promise.allSettled(allUpserts)
    }),
    map((results) => {
      const upserted = results.reduce(
        (acc, res) => {
          if (res.status === "rejected") {
            captureException(new Error('Upsert answer : promise rejected'), { extra: { reason: res.reason }})
            return acc
          }

          const value = res.value

          let target
          let rawAnswer

          // Find the correct targets according to the operation type
          if (value.createAnswer?.data) {
            target = acc.created
            rawAnswer = value.createAnswer.data
          } else if (value.updateAnswer?.data) {
            target = acc.updated
            rawAnswer = value.updateAnswer.data
          } else {
            captureException(new Error('Upsert answer : no data detected in resulting promise'), { extra: { value } })
            return acc
          }

          // Sanitize into correct payload form then push into related target
          const qId = rawAnswer.attributes?.question?.data?.id
          if (!qId) return acc

          const answer = { id: qId, changes: { id: rawAnswer.id } }
          target.push(answer)

          return acc
        },
        { created: [], updated: [] } as UpsertedAnswerPayload
      )

      return actions.updated(upserted)
    })
  )

export const answersEpics = combineEpics(upsertAnswersEpic)
