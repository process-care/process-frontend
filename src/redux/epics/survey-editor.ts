import { map, switchMap, scan, debounceTime, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store";
import { actions } from "@/redux/slices/survey-editor";

import { sdk } from "@/api/gql-client";
import { sanitizeEntities } from "@/api/entity-checker";
import { SurveyInput } from "@/api/graphql/sdk.generated";

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
    map((action) => action.payload?.changes?.attributes),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(500),
    switchMap(async (accumulated: SurveyInput) => {
      const savingAt = new Date().toISOString();
      const surveyId = state$.value.editor.survey.data?.id;
      await sdk.updateSurvey({ id: surveyId, data: accumulated });
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
      const data = state$.value.editor.survey.data?.attributes as SurveyInput;
      const format = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        language: data.language,
        status: "draft",
        keywords: [
          {
            label: data.keywords,
            value: data.keywords,
          },
        ],
        email: data.email,
      } as SurveyInput;

      // Create survey and its first page
      try {
        const surveyRes = await sdk.createSurvey({ values: format });
        const surveyId = surveyRes?.createSurvey?.data?.id;

        if (surveyId) {
          await sdk.addPage({
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
        return error;
      }
    }),
    map((surveyRes) => {
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
