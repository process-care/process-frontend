import { map, switchMap, filter, scan, debounceTime, timeInterval } from "rxjs"
import { combineEpics, ofType } from "redux-observable"
import { Epic } from "@/redux/store/index.js"
import { captureException, captureMessage } from "@sentry/nextjs"

import { actions, BulkSavedPayload, selectors, UpsertedAnswerPayload } from "@/redux/slices/participation/answers.js"
import { sdk } from "@/api/gql-client.js"
import { CreateAnswerMutation, UpdateAnswerMutation } from "@/api/graphql/sdk.generated.js"

const DEBOUNCE_TIME = 3000

// Update answers in the backend
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
        captureException(new Error("Upsert answer : Missing participation ID to save answers !"))
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
          if (!qId) {
            captureException(new Error('Upsert answer : no question ID detected in resulting promise'), { extra: { rawAnswer } })
            return acc
          }

          const answer = { id: qId, changes: { id: rawAnswer.id } }
          target.push(answer)

          return acc
        },
        { created: [], updated: [] } as UpsertedAnswerPayload
      )

      return actions.updated(upserted)
    })
  )

// Bulk update of the whole participation (this is a safeguard)
const bulkSaveAnswersEpic: Epic = (action$, state$) =>
    action$.pipe(
      ofType(actions.bulkSave.type),
      switchMap(async () => {
        const mode = state$.value.participation.status.mode
        if (mode === "preview") return []

        const participationId = state$.value.participation.status.participationId
        if (!participationId) {
          captureException(new Error("Bulk save : Missing participation ID to save answers !"))
          return []
        }

        const answers = selectors.selectAll(state$.value)
        const sanitizeAnswers = answers.map((a) => {
          let { id, questionId, value } = a

          // Wrap string so it doesn't crash in the backend (STRAPI, JSON, toussa)
          if (typeof value === "string") {
            value = { answer: value }
          }

          return { id, question: questionId, participation: participationId, value }
        })

        // Create or update, depending on the presence of an Answer ID
        try {
          const res = await sdk.bulkSaveAnswers({ data: sanitizeAnswers })

          // Catch errors if any
          if (res.bulkSave?.errors.length > 0) {
            captureException(new Error('Bulk save : some answers were not saved'), { extra: { participationId, errors: res.bulkSave?.errors } })
          }

          // Then check for data to continue the pipeline
          if (!res.bulkSave?.data) {
            captureException(new Error('Bulk save : no data detected in resulting promise'), { extra: { participationId, res } })
            return []
          }

          captureMessage('Bulk save : answers saved', { level: 'debug', extra: { participationId, nbAnswers: res.bulkSave.data.length, results: res.bulkSave.data }})
          return res.bulkSave.data
          
        } catch (e) {
          // If anything goes wrong, we catch it and log it
          captureException(e, { extra: { participationId, sanitizeAnswers } })
          return []
        }
      }),
      map((results) => {
        const bulked = results.reduce((acc, raw) => {
          // Sanitize into correct payload form then push into related target
          const qId = raw.attributes?.question?.data?.id
          if (!qId) {
            captureException(new Error('Bulk save : no question ID detected in resulting promise'), { extra: { rawAnswer: raw } })
            return acc
          }

          if (!raw.id) {
            captureException(new Error('Bulk save : no answer ID detected in resulting promise'), { extra: { rawAnswer: raw } })
            return acc
          }

          const answer = { id: qId, changes: { id: raw.id } }
          acc.push(answer)

          return acc
        }, [] as BulkSavedPayload)

        return actions.bulkSaved(bulked)
      })
    )


// Exports
export const answersEpics = combineEpics(upsertAnswersEpic, bulkSaveAnswersEpic)
