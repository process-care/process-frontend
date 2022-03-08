import { map, switchMap, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";

import { sdk } from "api/gql-client";
import { actions as statusAct } from "redux/slices/participation/status";
import { sanitizeEntities } from "api/entity-checker";

// Initialize pages-visited upon init
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(statusAct.initialize.type),
    filter((action) => action.payload.surveyId && action.payload.participationId),
    switchMap(async (action) => {
      const { participationId, surveyId, slug } = action.payload;

      const pages = sdk.survey({ id: surveyId }).then((res) => {
        const data = res.survey?.data?.attributes?.pages?.data;
        return sanitizeEntities(data);
      });

      const questions = sdk.questionsBySurveySlug({ slug }).then((res) => {
        const data = res?.questions?.data;
        return sanitizeEntities(data);
      });

      const answers = sdk.AnswersByParticipation({ participationId }).then((res) => {
        const data = res.answers?.data;
        const sanitized = sanitizeEntities(data);

        // Unwrap strings from their object form so they work normaly in Textarea
        const unwrapped = sanitized.map((answer) => {
          if (typeof answer.attributes.value.answer === "string") {
            answer.attributes.value = answer.attributes.value.answer;
          }
          return answer;
        });

        return unwrapped;
      });

      return Promise.all([pages, questions, answers]);
    }),
    map((results) => {
      const pages = results[0];
      const questions = results[1];
      const answers = results[2];

      const payload = { pages, questions, answers };
      return statusAct.initialized(payload);
    })
  );

export const initializeEpics = combineEpics(initializeEpic);
