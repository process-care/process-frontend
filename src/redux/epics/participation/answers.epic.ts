import { map, switchMap, filter, scan, debounceTime, timeInterval } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';

import { actions, selectors } from 'redux/slices/participation/answers';
import { client } from 'call/actions';
import { CREATE_ANSWER, UPDATE_ANSWER } from 'call/queries/answers';

// Initialize pages-visited upon init
const upsertAnswersEpic: Epic = (action$, state$) => action$.pipe(
  ofType(actions.update.type),
  filter(action => action.payload.questionId),
  map(action => action.payload),
  timeInterval(),
  scan((acc, payload) => {
    const { value, interval } = payload;
    if (interval > 3000) acc = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : we are sure we have a questionId, see "filter" above the chain
    acc[value.questionId] = value.value;
    return acc;
  }, {}),
  debounceTime(3000),
  switchMap(async (accu) => {
    console.log('this is the accumulated values: ', accu);

    const allUpserts = Object.entries(accu).map(([qId, value]) => {
      const answerInState = selectors.selectById(state$.value, qId);
      return (answerInState?.id)
        ? client.request(UPDATE_ANSWER, { id: answerInState.id, data: { value } })
        : client.request(CREATE_ANSWER, { data: { value, question: qId } });
    });

    return Promise.all(allUpserts);
  }),
  map(results => {
    console.log('results of upserts: ', results);
    return actions.updated;
  }),
);

export const answersEpics = combineEpics(upsertAnswersEpic);
