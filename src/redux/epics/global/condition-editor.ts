import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic, store } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { v4 as uuidv4 } from "uuid";
import { sdk } from "api/gql-client";
import { hasAttributes } from "api/entity-checker";

// ----  CREATE CONDITION

const createEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.createCondition.type),
    switchMap(async (action) => {
      const { type, refererId, group } = action.payload;

      const createdAt = new Date().toISOString();
      const newGroup = `group-${uuidv4()}`;

      const newCondition = await sdk.createCondition({
        data: {
          type,
          [type === "question" ? "referer_question" : "referer_page"]: refererId,
          group: group === undefined ? newGroup : group,
        },
      });

      return { createdAt, newCondition };
    }),
    map(({ newCondition, createdAt }) => {
      const redirectToPage = store.getState().scientistData.pages.selectedPage;
      const data = newCondition?.createCondition?.data;
      // TODO:ERROR: Handle the error and use case better
      // Can `redirectToPage` really be undefined ? If yes, what does it mean ?
      if (!hasAttributes(data) || !redirectToPage) return actions.error({});

      return actions.createdCondition({
        lastCreated: createdAt,
        condition: data,
        isValid: false,
        step: 1,
        redirectToPage,
      });
    })
  );

// // ----  DELETE CONDITION

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.deleteCondition.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await sdk.deleteCondition({ id });
      return deletedAt;
    }),
    map((deletedAt) => {
      return actions.deletedCondition({
        lastDeleted: deletedAt,
      });
    })
  );

// // ----  DELETE GROUP CONDITION

const deleteGroupEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.deleteGroupCondition.type),
    switchMap(async (action) => {
      const groupId: string = action.payload.groupId;
      const deletedAt = new Date().toISOString();
      await sdk.deleteGroupCondition({ name: groupId });
      return deletedAt;
    }),
    map((deletedAt) => {
      return actions.deletedGroupCondition({
        lastDeleted: deletedAt,
      });
    })
  );

// // ----  SAVE CONDITION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.saveCondition.type),
    switchMap(async () => {
      const savedAt: string = new Date().toISOString();
      const selectedConditionId = state$.value.scientistData.conditions.selectedCondition;
      const conditions = Object.entries(state$.value.scientistData.conditions.entities);

      const changes = conditions.filter((c) => c[0] === selectedConditionId)[0];
      // We need to send target : id, referer_question:id, but ConditionRedux have full Question object adn we use it in frontend

      const data = changes[1]?.attributes;
      const isTypePage = data?.type === "page";

      const condition = {
        target: data?.target?.data?.id,
        referer_question: isTypePage ? undefined : data?.referer_question?.data?.id,
        referer_page: isTypePage ? data?.referer_page?.data?.id : undefined,
        target_value: data?.target_value,
        type: data?.type,
        group: data?.group,
        operator: data?.operator,
      };

      await sdk.updateCondition({
        id: selectedConditionId,
        data: condition,
      });

      return { savedAt, condition };
    }),
    map(({ savedAt, condition }) => actions.savedCondition({ lastSaved: savedAt, condition }))
  );

export const conditionsEditorEpics = combineEpics(createEpic, saveEpic, deleteEpic, deleteGroupEpic);
