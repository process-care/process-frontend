import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic, store } from "redux/store";
import { actions } from "redux/slices/formEditor/condition-editor";
import { v4 as uuidv4 } from "uuid";
import { client } from "call/actions";

import {
  ADD_CONDITION,
  DELETE_CONDITION,
  DELETE_GROUP_CONDITION,
  GET_CONDITIONS_BY_QUESTION,
  UPDATE_CONDITION,
} from "call/queries/formBuilder/condition";

// ---- INITIALIZE CONDITION

const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      console.log("INITIALIZE CONDITION");

      return client.request(GET_CONDITIONS_BY_QUESTION, {
        where: { referer_question: action.payload },
      });
    }),
    map((result) => {
      if (result) {
        return actions.initialized(result.conditions);
      } else return actions.initialized([]);
    })
  );

// ----  CREATE CONDITION

const createEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.create.type),
    switchMap(async (action) => {
      const redirectToPage = store.getState().formEditor.pages.selectedPage;
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

      return { createdAt, newCondition, redirectToPage };
    }),
    map(
      ({
        newCondition,
        createdAt,
        redirectToPage,
      }: {
        newCondition: any;
        createdAt: string;
        redirectToPage: string;
      }) => {
        const data = newCondition.createCondition.condition;
        return actions.created({
          lastCreated: createdAt,
          condition: data,
          isValid: false,
          step: 1,
          redirectToPage,
        });
      }
    )
  );

// // ----  DELETE CONDITION

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.delete.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_CONDITION, {
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

// // ----  DELETE GROUP CONDITION

const deleteGroupEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.deleteGroup.type),
    switchMap(async (action) => {
      const groupId: string = action.payload.groupId;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_GROUP_CONDITION, {
        name: groupId,
      });
      return deletedAt;
    }),
    map((deletedAt) => {
      return actions.deletedGroup({
        lastDeleted: deletedAt,
      });
    })
  );

// // ----  SAVE CONDITION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.save.type),
    switchMap(async () => {
      const savedAt: string = new Date().toISOString();
      const selectedConditionId =
        state$.value.formEditor.conditions.selectedCondition;

      const conditions = Object.entries(
        state$.value.formEditor.conditions.entities
      );
      const changes = conditions.filter((c) => c[0] === selectedConditionId)[0];
      // We need to send target : id, referer_question:id, but Icondition have full Question object adn we use it in frontend
      const formatPayload = (changes: any) => {
        return {
          ...changes[1],
          id: undefined,
          target: changes[1].target.id,
          referer_question: changes[1].referer_question?.id,
          referer_page: changes[1].referer_page?.id,
        };
      };
      const condition = formatPayload(changes);

      await client.request(UPDATE_CONDITION, {
        id: selectedConditionId,
        data: condition,
      });
      return { savedAt, condition };
    }),
    map(({ savedAt, condition }) =>
      actions.saved({ lastSaved: savedAt, condition })
    )
  );

export const conditionsEditorEpics = combineEpics(
  initializeEpic,
  createEpic,
  saveEpic,
  deleteEpic,
  deleteGroupEpic
);
