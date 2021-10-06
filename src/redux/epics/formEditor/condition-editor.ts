import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/formEditor/condition-editor";
import { v4 as uuidv4 } from "uuid";

import { client } from "call/actions";

import {
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "call/queries/formBuilder/question";
import { ADD_CONDITION } from "call/queries/formBuilder/condition";

// ---- INITIALIZE CONDITION

// const initializeEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType(actions.initialize.type),
//     switchMap((action) => {
//       return client.request(GET_CONDITIONS, { taget: action.payload });
//     }),
//     map((result) => {
//       const payload = result.questions;
//       return actions.initialized(payload);
//     })
//   );

// ----  CREATE CONDITION

const createEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.create.type),
    switchMap(async (action) => {
      console.log(action);
      const { type, refererId, group } = action.payload;
      const createdAt = new Date().toISOString();
      const newGroup = `group-${uuidv4()}`;
      const newCondition = await client.request(ADD_CONDITION, {
        newCondition: {
          type,
          [type === "question" ? "referer_question" : "referer_page"]:
            refererId,
          group: group === undefined ? newGroup : group,
        },
      });

      return { createdAt, newCondition };
    }),
    map(
      ({
        newCondition,
        createdAt,
      }: {
        newCondition: any;
        createdAt: string;
      }) => {
        const data = newCondition.createCondition.condition;
        const formatCondition = {
          ...data,
          isValid: false,
          step: 1,
        };
        return actions.created({
          lastCreated: createdAt,
          condition: formatCondition,
        });
      }
    )
  );

// // ----  SAVE CONDITION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.save.type),
    switchMap(async (action) => {
      const savedAt: string = new Date().toISOString();
      const selectedQuestionId =
        state$.value.formEditor.questions.selectedQuestion;

      await client.request(UPDATE_QUESTION, {
        id: selectedQuestionId,
        data: action.payload.changes,
      });
      return savedAt;
    }),
    map((savedAt) => actions.saved({ lastSaved: savedAt }))
  );

// // ----  DELETE CONDITION

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.delete.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_QUESTION, {
        id,
      });
      return deletedAt;
    }),
    map((deletedAt) => {
      return actions.deleted({
        lastDeleted: deletedAt,
      });
    })
  );

export const conditionsEditorEpics = combineEpics(
  // initializeEpic,
  createEpic,
  saveEpic,
  deleteEpic
);
