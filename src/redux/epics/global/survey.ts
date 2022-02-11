import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { sdk } from "api/gql-client";
import { sanitizeEntity } from "api/entity-checker";

// Watches over "initialize" currentsurvey
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurvey.type),
    switchMap((action) => {
      return sdk.surveyBySlug({ slug: action.payload });
    }),
    map((result) => {
      const payload = sanitizeEntity(result.surveys?.data[0]);

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
      console.log("Payload - update survey: ", payload);

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
