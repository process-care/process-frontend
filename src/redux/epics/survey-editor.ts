import { map, switchMap, scan, debounceTime, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store/index.js";
import { actions } from "@/redux/slices/survey-editor.js"

import { sdk } from "@/api/gql-client.js"
import { sanitizeEntities } from "@/api/entity-checker.js"
import { SurveyInput } from "@/api/graphql/sdk.generated.js"
import { Enum_Survey_Status } from "@/api/graphql/types.generated";

// Watches over "load" survey
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap(async (action) => {
      const slug = action.payload

      const result = await sdk.surveyBySlug({ slug }).then((res) => {
        const data = res.surveys?.data
        return sanitizeEntities(data)
      })

      return result
    }),
    map((result) => {
      return actions.initialized(result)
    })
  );

// Watches over any "update" for the survey
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    filter(() => {
      // If surveyId is undefined, it means we are creating a new survey and we don't need to update it
      const surveyId = state$.value.editor.survey.data.id
      return Boolean(surveyId)
    }),
    map((action) => action.payload?.changes?.attributes),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(500),
    switchMap(async (accumulated: any) => {
      const savingAt = new Date().toISOString()
      const surveyId = state$.value.editor.survey.data?.id

      const sanitized = sanitizeMeta(accumulated)
      await sdk.updateSurvey({ id: surveyId, data: sanitized })
      return savingAt
    }),
    map((savedDate) => actions.updated({ lastSaved: savedDate }))
  );

// Watches over any "post" for the survey
const postEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.post.type),
    filter(() => {
      // If surveyId is defined, it means we don't need to create it
      const surveyId = state$.value.editor.survey.data?.id
      return !surveyId
    }),
    switchMap(async () => {
      const data = state$.value.editor.survey.data?.attributes
      const format = {
        ...sanitizeMeta(data),
        status: Enum_Survey_Status.Draft,
      }

      // Create survey and its first page
      try {
        const surveyRes = await sdk.createSurvey({ values: format })
        const surveyId = surveyRes?.createSurvey?.data?.id

        if (surveyId) {
          await sdk.addPage({
            values: {
              name: `Page 1`,
              is_locked: false,
              short_name: `P1`,
              survey: surveyId,
            },
          })
        }

        return surveyRes
      } catch (error: any) {
        return error
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

// ---- UTILS

function sanitizeMeta(data: any): SurveyInput {
  const sanitized: any = {}

  // Loop over all the fields of `data` and sanitize them
  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case "keywords":
        sanitized[key] = [
          {
            label: value,
            value: value,
          },
        ]
        break

      default:
        sanitized[key] = value
        break
    }
  }

  return sanitized
}