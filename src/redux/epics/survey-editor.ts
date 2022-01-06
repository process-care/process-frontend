import { map, switchMap, scan, debounceTime, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/survey-editor";

import { client } from "call/actions";
import { GET_SURVEY, UPDATE_SURVEY, ADD_SURVEY } from "call/queries/survey";
import { ADD_PAGE } from "call/queries/formBuilder/page";

// Watches over "load" survey
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      return client.request(GET_SURVEY, { id: action.payload });
    }),
    map((result) => {
      const payload = result.survey;
      return actions.initialized(payload);
    })
  );

// Watches over any "update" for the survey
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    filter(() => {
      // If surveyId is undefined, it means we are creating a new survey and we don't need to update it
      const surveyId = state$.value.editor.survey.data?.id;
      return Boolean(surveyId);
    }),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(5000),
    switchMap(async (accumulated) => {
      const savingAt = new Date().toISOString();
      const data = { ...accumulated, id: undefined };
      const surveyId = state$.value.editor.survey.data?.id;
      await client.request(UPDATE_SURVEY, { id: surveyId, data });
      return savingAt;
    }),
    map((savedDate) => actions.updated({ lastSaved: savedDate }))
  );

// Watches over any "update" for the survey
const postEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.post.type),
    filter(() => {
      // If surveyId is defined, it means we don't need to create it
      const surveyId = state$.value.editor.survey.data?.id;
      return !surveyId;
    }),
    switchMap(async () => {
      const data = state$.value.editor.survey.data;
      // Create survey and its first page
      try {
        const surveyRes = await client.request(ADD_SURVEY, {
          values: {
            ...data,
            status: "draft",
          },
        });

        const surveyId = surveyRes?.createSurvey?.survey.id;
        if (surveyId) {
          await client.request(ADD_PAGE, {
            values: {
              name: `Page 1`,
              is_locked: false,
              short_name: `P1`,
              survey: surveyId,
            },
          });
        }
        return surveyRes;
      } catch (error: any) {
        console.log(error);
        return error;
      }
    }),
    map((surveyRes) => {
      console.log("surveyRes", surveyRes);
      const postedAt = new Date().toISOString();

      if (surveyRes.response?.errors) {
        return actions.failed(surveyRes?.response?.errors);
      } else
        return actions.posted({
          lastPosted: postedAt,
        });
    })
  );

export const surveyEditorEpics = combineEpics(loadEpic, updateEpic, postEpic);
