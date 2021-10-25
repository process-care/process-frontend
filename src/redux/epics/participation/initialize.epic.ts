import { map, switchMap, filter } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';

import { client } from 'call/actions';
import { actions as statusAct } from 'redux/slices/participation/status';
import { GET_SURVEY } from 'call/queries/survey';
import { GET_QUESTIONS_BY_SURVEY } from 'call/queries/formBuilder/question';
import { GET_ANSWERS_BY_PARTICIPATION } from 'call/queries/answers';

// Initialize pages-visited upon init
const initializeEpic: Epic = (action$) => action$.pipe(
  ofType(statusAct.initialize.type),
  filter(action => action.payload.surveyId && action.payload.participationId),
  switchMap(async (action) => {
    const  { participationId, surveyId } = action.payload;
    
    const pages = client.request(GET_SURVEY, { id: surveyId }).then(res => res.survey?.pages);
    const questions = client.request(GET_QUESTIONS_BY_SURVEY, { surveyId }).then(res => res.questionsBySurvey);
    const answers = client.request(GET_ANSWERS_BY_PARTICIPATION, { participationId }).then(res => res.answers);
    
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