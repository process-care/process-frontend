import { map, switchMap, filter } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';

import { client, sdk } from 'api/gql-client';
import { actions as statusAct } from 'redux/slices/participation/status';
import { AnswersByParticipationDocument, QuestionsBySurveyDocument } from './initialization.gql.generated';
// Initialize pages-visited upon init
const initializeEpic: Epic = (action$) => action$.pipe(
  ofType(statusAct.initialize.type),
  filter(action => action.payload.surveyId && action.payload.participationId),
  switchMap(async (action) => {
    const  { participationId, surveyId } = action.payload;

    const pages = await sdk.Survey({ id: surveyId }).then(res => res.survey?.data?.attributes?.pages);
    const questions = client.request(QuestionsBySurveyDocument, { surveyId }).then(res => res.questionsBySurvey);
    const answers = client.request(AnswersByParticipationDocument, { participationId }).then(res => res.answers);
    
    return Promise.all([pages, questions, answers]);
  }),
  map(results => {
    const pages = results[0]?.data ?? [];
    const questions = results[1];
    const answers = results[2];

    const payload = { pages, questions, answers };
    return statusAct.initialized(payload);
  }),
);

export const initializeEpics = combineEpics(initializeEpic);

// function isSafe(page: PageEntity): page is SafePage {
//   return Boolean(page.id);
// }

// const sanitized = truc?.reduce((acc, page) => {
//   if (isSafe(page)) acc.push(page);
//   return acc;
// }, [] as SafePage[]);