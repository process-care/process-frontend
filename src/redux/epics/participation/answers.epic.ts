import { map, switchMap, filter, scan, debounceTime, timeInterval } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';

import { actions, selectors } from 'redux/slices/participation/answers';
import { client } from 'api/gql-client';
import { CreateAnswerDocument, UpdateAnswerDocument } from 'api/graphql/queries/answers.gql.generated';

const DEBOUNCE_TIME = 3000;

// Initialize pages-visited upon init
const upsertAnswersEpic: Epic = (action$, state$) => action$.pipe(
  ofType(actions.update.type),
  filter(action => action.payload.questionId),
  map(action => action.payload),
  timeInterval(),
  scan((acc, payload) => {
    const { value, interval } = payload;
    // After the same interval as the debounced time, we reset the accumulator
    if (interval > DEBOUNCE_TIME) acc = {};

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : we are sure we have a questionId, see "filter" above the chain
    acc[value.questionId] = value.value;
    return acc;
  }, {}),
  debounceTime(DEBOUNCE_TIME),
  switchMap(async (accu) => {
    const participationId = state$.value.participation.status.participationId;

    if (!participationId) throw new Error('Missing participation Id to save answers !');
    
    const allUpserts = Object.entries(accu).map(([qId, value]) => {
      const answerInState = selectors.selectById(state$.value, qId);
      return (answerInState?.id)
        ? client.request(UpdateAnswerDocument, { id: answerInState.id, data: { value } })
        : client.request(CreateAnswerDocument, { data: { value, question: qId, participation: participationId } });
    });

    return Promise.all(allUpserts);
  }),
  map(results => {
    const upserted = results.reduce((acc, res) => {
      let target;
      let rawAnswer;

      // Find the correct targets according to the operation type
      if (res.createAnswer) {
        target = acc.created;
        rawAnswer = res.createAnswer.answer;
      }
      else {
        target = acc.updated;
        rawAnswer = res.updateAnswer.answer;
      }

      // Sanitize into correct payload form then push into related target
      const answer = { id: rawAnswer.question.id, changes: { id: rawAnswer.id } };
      target.push(answer);

      return acc;
    }, { created: [], updated: [] });

    return actions.updated(upserted);
  }),
);

export const answersEpics = combineEpics(upsertAnswersEpic);
