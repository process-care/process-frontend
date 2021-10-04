import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/survey";
import { client } from "call/actions";
import { GET_SURVEY_BY_SLUG, UPDATE_ORDER } from "call/queries/survey";

// Watches over "initialize" currentsurvey
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      return client.request(GET_SURVEY_BY_SLUG, { slug: action.payload });
    }),
    map((result) => {
      const payload = result.surveys[0];
      return actions.initialized(payload);
    })
  );

// Watches over "updateOrder" currentsurvey
const updateOrderEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.updateOrder.type),
    // TODO: update order in api
    map((action) => action.payload),
    switchMap((action) => {
      const selectedSurveyId = state$.value.formEditor.survey.survey.id;
      return client.request(UPDATE_ORDER, {
        id: selectedSurveyId,
        data: { new_order: action.payload },
      });
    }),
    map((payload) => {
      return actions.updatedOrder(payload);
    })
  );

export const surveyEpics = combineEpics(initializeEpic, updateOrderEpic);
