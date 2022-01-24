import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { client } from "call/actions";
import {
  DELETE_SURVEY,
  GET_MY_SURVEYS,
  UPDATE_SURVEY,
} from "call/queries/survey";
import { shapeSurveys } from "call/shapers/survey";

// Watches over "initialize" surveys
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurveys.type),
    switchMap(async (action) => {
      const res = await client.request(GET_MY_SURVEYS, { authorId: action.payload });
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
      await client.request(UPDATE_SURVEY, {
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
      await client.request(DELETE_SURVEY, {
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
