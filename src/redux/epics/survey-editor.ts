import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/survey-editor";

import { client } from "call/actions";
import { GET_SURVEY, UPDATE_SURVEY } from "call/queries/survey";

// Watches over "load" landing
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.load.type),
    switchMap((action) => client.request(GET_SURVEY, { id: action.payload })),
    map((result) => {
      const payload = result.survey;
      return actions.loaded(payload);
    })
  );

// Watches over any "update" for the survey
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(5000),
    switchMap(async (accumulated) => {
      const currentSurveyId = state$.value.surveyEditor.data?.id;

      if (!currentSurveyId) {
        throw new Error("No Landing ID to save the modifications to.");
      }

      const savingAt = new Date().toISOString();
      const data = { ...accumulated, id: undefined };

      await client.request(UPDATE_SURVEY, { id: currentSurveyId, data });
      return savingAt;
    }),
    map((savedDate) => actions.updated({ lastSaved: savedDate }))
  );

export const surveyEditorEpics = combineEpics(loadEpic, updateEpic);
