import { map, switchMap, filter, scan, debounceTime, timeInterval } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store/index.js";

import { actions, selectors, UpsertedAnswerPayload } from "@/redux/slices/participation/answers.js"
import { sdk } from "@/api/gql-client.js"
import { CreateAnswerMutation, UpdateAnswerMutation } from "@/api/graphql/sdk.generated.js"

const DEBOUNCE_TIME = 3000;

// Initialize pages-visited upon init
const upsertAnswersEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    filter((action) => action.payload.questionId),
    map((action) => action.payload),
    timeInterval(),
    scan((acc, payload) => {
      const { value, interval } = payload;
      // After the same interval as the debounced time, we reset the accumulator
      if (interval > DEBOUNCE_TIME) acc = {};

      // @ts-ignore : we are sure we have a questionId, see "filter" above the chain
      acc[value.questionId] = value.value;
      return acc;
    }, {}),
    debounceTime(DEBOUNCE_TIME),
    switchMap(async (accu) => {
      const participationId = state$.value.participation.status.participationId;

      if (!participationId) throw new Error("Missing participation ID to save answers !");

      const allUpserts: Promise<CreateAnswerMutation & UpdateAnswerMutation>[] = Object.entries(accu).map(
        ([qId, value]) => {
          const answerInState = selectors.selectById(state$.value, qId);

          // Wrap string so it doesn't crash in the backend (STRAPI, JSON, toussa)
          if (typeof value === "string") {
            value = { answer: value };
          }

          return answerInState?.id
            ? sdk.updateAnswer({ id: answerInState.id, data: { value } })
            : sdk.createAnswer({ data: { value, question: qId, participation: participationId } });
        }
      );

      return Promise.all(allUpserts);
    }),
    map((results) => {
      const upserted = results.reduce(
        (acc, res) => {
          let target;
          let rawAnswer;

          // Find the correct targets according to the operation type
          if (res.createAnswer?.data) {
            target = acc.created;
            rawAnswer = res.createAnswer.data;
          } else if (res.updateAnswer?.data) {
            target = acc.updated;
            rawAnswer = res.updateAnswer.data;
          } else {
            return acc;
          }

          // Sanitize into correct payload form then push into related target
          const qId = rawAnswer.attributes?.question?.data?.id;
          if (!qId) return acc;

          const answer = { id: qId, changes: { id: rawAnswer.id } };
          target.push(answer);

          return acc;
        },
        { created: [], updated: [] } as UpsertedAnswerPayload
      );

      return actions.updated(upserted);
    })
  );

export const answersEpics = combineEpics(upsertAnswersEpic);
