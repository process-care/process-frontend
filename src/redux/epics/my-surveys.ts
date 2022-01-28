import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { client } from "api/gql-client";
import { shapeSurveys } from "api/shapers/survey";
import { MySurveysDocument } from "./queries/my-survey.gql.generated";
import { DeleteSurveyDocument, UpdateSurveyDocument } from "api/graphql/queries/survey.gql.generated";

// Watches over "initialize" surveys
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurveys.type),
    switchMap(async (action) => {
      const res = await client.request(MySurveysDocument, { authorId: action.payload });
      return shapeSurveys(res);
    }),
    map((result) => {
      const payload = result.data;
      return actions.initializedSurveys(payload);
    })
  );

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.updateSurveys.type),
    map((action) => action.payload),
    switchMap(async (action) => {
      const updatedAt: string = new Date().toISOString();
      console.log("updateEpic", action);
      const { id, changes } = action;
      await client.request(UpdateSurveyDocument, {
        id,
        data: changes,
      });
      return updatedAt;
    }),
    map((updatedAt) => {
      return actions.updatedSurveys({ lastUpdated: updatedAt });
    })
  );

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.deleteSurvey.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DeleteSurveyDocument, {
        id,
      });

      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      return actions.deletedSurvey({
        lastDeleted: deletedAt,
      });
    })
  );

export const surveysEpics = combineEpics(
  initializeEpic,
  updateEpic,
  deleteEpic
);
