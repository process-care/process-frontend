import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store";
import { actions } from "@/redux/slices/scientistData";
import { sdk } from "@/api/gql-client";

import { sanitizeEntities } from "@/api/entity-checker";

// Watches over "initialize" surveys
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurveys.type),
    switchMap(async (action) => {
      const response = await sdk.mySurveys({ authorId: action.payload }).then((res) => {
        const data = res.surveys?.data;
        return sanitizeEntities(data);
      });

      return response;
    }),
    map((response) => {
      return actions.initializedSurveys(response);
    })
  );

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.updateSurveys.type),
    map((action) => action.payload),
    switchMap(async (action) => {
      const updatedAt: string = new Date().toISOString();
      const { id, changes } = action;

      await sdk.updateSurvey({ id, data: changes?.attributes });
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

      await sdk.deleteSurvey({ id });
      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      return actions.deletedSurvey({
        lastDeleted: deletedAt,
      });
    })
  );

export const surveysEpics = combineEpics(initializeEpic, updateEpic, deleteEpic);
