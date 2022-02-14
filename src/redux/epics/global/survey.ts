import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { sdk } from "api/gql-client";
import { sanitizeEntities, sanitizeEntity } from "api/entity-checker";

// Watches over "initialize" currentsurvey
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurvey.type),
    switchMap(async (action) => {
      const survey = sdk.surveyBySlug({ slug: action.payload }).then((res) => {
        // Get survey - pages and conditions's pages
        const data = res.surveys?.data[0];
        return sanitizeEntity(data);
      });
      const questions = sdk.questionsBySurveySlug({ slug: action.payload }).then((res) => {
        // Get questions - pages and conditions's questions
        const data = res.questions?.data;
        return sanitizeEntities(data);
      });

      return Promise.all([survey, questions]);
    }),
    map((results) => {
      const survey = results[0];
      const questions = results[1];
      const payload = { survey, questions };

      // Raise an error if no survey found
      if (!payload) return actions.error({});

      return actions.initializedSurvey(payload);
    })
  );

// Watches over "updateOrder" currentsurvey
const updateOrderEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.updateOrder.type),
    map((action) => action.payload),
    switchMap((payload) => {
      const selectedSurveyId = state$.value.scientistData.survey.selectedSurvey;
      return sdk.updateOrder({
        id: selectedSurveyId,
        new_order: payload,
      });
    }),
    map((_result) => {
      return actions.updatedOrder({});
    })
  );

// Watches over "update" currentsurvey => update the needConsent change

const updateSurveyEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.updateSurvey.type),
    map((action) => action.payload),
    switchMap((payload) => {
      return sdk.updateSurvey({
        id: payload.id,
        data: {
          need_consent: payload.needConsent,
        },
      });
    }),
    map((_payload) => {
      const lastUpdated = new Date().toISOString();
      return actions.updatedSurvey({ lastUpdated });
    })
  );

const TestEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.checkSurvey.type),
    map((action) => action.payload),
    switchMap(() => {
      const selectedSurveyId = state$.value.scientistData.survey.selectedSurvey;
      return sdk.checkSurvey({ surveyId: selectedSurveyId });
    }),
    map((payload) => {
      return actions.checkedSurvey(payload);
    })
  );

export const surveyEpics = combineEpics(initializeEpic, updateOrderEpic, TestEpic, updateSurveyEpic);
