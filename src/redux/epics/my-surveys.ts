import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/my-surveys";
import { client } from "call/actions";
import {
  DELETE_SURVEY,
  GET_MY_SURVEYS,
  UPDATE_SURVEY,
} from "call/queries/survey";

// Watches over "initialize" surveys
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      return client.request(GET_MY_SURVEYS, { authorId: action.payload });
    }),
    map((result) => {
      const payload = result.surveys;
      return actions.initialized(payload);
    })
  );

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.update.type),
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
      return actions.updated({ lastUpdated: updatedAt });
    })
  );

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.delete.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_SURVEY, {
        id,
      });

      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      return actions.deleted({
        lastDeleted: deletedAt,
      });
    })
  );

export const surveysEpics = combineEpics(
  initializeEpic,
  updateEpic,
  deleteEpic
);
