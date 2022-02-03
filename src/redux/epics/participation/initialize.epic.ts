import { map, switchMap, filter } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';

import { sdk } from 'api/gql-client';
import { actions as statusAct } from 'redux/slices/participation/status';
import { sanitizeEntities } from 'api/entity-checker';

// Initialize pages-visited upon init
const initializeEpic: Epic = (action$) => action$.pipe(
  ofType(statusAct.initialize.type),
  filter(action => action.payload.surveyId && action.payload.participationId),
  switchMap(async (action) => {
    const  { participationId, surveyId } = action.payload;

    const pages = sdk.Survey({ id: surveyId }).then(res => {
      const data = res.survey?.data?.attributes?.pages?.data;
      return sanitizeEntities(data);
    });

    const questions = sdk.QuestionsBySurvey({ surveyId }).then(res => {
      const data = res.questionsBySurvey;
      return sanitizeEntities(data);
    });

    const answers = sdk.AnswersByParticipation({ participationId }).then(res => {
      const data = res.answers?.data;
      return sanitizeEntities(data);
    });
    
    return Promise.all([pages, questions, answers]);
  }),
  map(results => {
    const pages = results[0];
    const questions = results[1];
    const answers = results[2];

    const payload = { pages, questions, answers };
    return statusAct.initialized(payload);
  }),
);

export const initializeEpics = combineEpics(initializeEpic);
