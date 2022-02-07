import { map, switchMap, scan, debounceTime, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/survey-editor";

import { client, sdk } from "api/gql-client";
import {
  AddSurveyDocument,
  UpdateSurveyDocument,
} from "api/graphql/queries/survey.gql.generated";
import { AddPageDocument } from "api/graphql/queries/page.gql.generated";
import { sanitizeEntities } from "api/entity-checker";

// Watches over "load" survey
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap(async (action) => {
      const slug = action.payload;
      const result = await sdk.surveyBySlug({ slug }).then((res) => {
        const data = res.surveys?.data;
        return sanitizeEntities(data);
      });
      return result;
    }),
    map((result) => {
      return actions.initialized(result);
    })
  );

// Watches over any "update" for the survey
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    filter(() => {
      // If surveyId is undefined, it means we are creating a new survey and we don't need to update it
      const surveyId = state$.value.editor.survey.data.id;
      return Boolean(surveyId);
    }),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(5000),
    switchMap(async (accumulated) => {
      const savingAt = new Date().toISOString();
      const data = { ...accumulated, id: undefined };
      const surveyId = state$.value.editor.survey.data?.id;
      await client.request(UpdateSurveyDocument, { id: surveyId, data });
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
        const surveyRes = await client.request(AddSurveyDocument, {
          values: {
            ...data,
            status: "draft",
          },
        });

        const surveyId = surveyRes?.createSurvey?.data.id;
        if (surveyId) {
          await client.request(AddPageDocument, {
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
