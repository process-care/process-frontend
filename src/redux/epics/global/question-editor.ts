import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";

import { client } from "call/actions";

import {
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "call/queries/formBuilder/question";
import { UPDATE_ORDER } from "call/queries/survey";

// ----  CREATE QUESTION

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.createQuestion.type),
    switchMap(async (action) => {
      const { type } = action.payload;
      const createdAt = new Date().toISOString();
      const selectedPageId = state$.value.scientistData.pages.selectedPage;
      const newQuestion = await client.request(ADD_QUESTION, {
        values: {
          type,
          page: selectedPageId,
        },
      });

      return { newQuestion, createdAt };
    }),
    map(
      ({
        newQuestion,
        createdAt,
      }: {
        newQuestion: Record<string, any>;
        createdAt: string;
      }) => {
        const global = state$.value.scientistData;
        const { type, id } = newQuestion.createQuestion.question;
        return actions.createdQuestion({
          question: {
            ...newQuestion.createQuestion.question,
            internal_title: `${type}-${id}`,
          },
          global,
          lastCreated: createdAt,
        });
      }
    )
  );

// // ----  SAVE QUESTION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.saveQuestion.type),
    switchMap(async (action) => {
      const savedAt: string = new Date().toISOString();
      const selectedQuestionId =
        state$.value.scientistData.questions.selectedQuestion;
      const selectedQuestion =
        state$.value.scientistData.questions.entities[selectedQuestionId];
      const selectedSurvey = state$.value.scientistData.survey.selectedSurvey;
      const order = state$.value.scientistData.survey.order;

      const changes = { ...action.payload.changes };
      changes.page = changes.page.id;
      changes.id = undefined;
      changes.conditions = undefined;
      // TODO: change the hack to send the internal title only when it is modify

      await client.request(UPDATE_QUESTION, {
        id: selectedQuestionId,
        data: {
          ...changes,
          internal_title: selectedQuestion?.internal_title,
        },
      });
      await client.request(UPDATE_ORDER, {
        id: selectedSurvey,
        new_order: order,
      });
      return savedAt;
    }),
    map((savedAt) => actions.savedQuestion({ lastSaved: savedAt }))
  );

// // ----  DELETE QUESTION

const deleteEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.deleteQuestion.type),
    switchMap(async (action) => {
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_QUESTION, {
        id,
      });

      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      const selectedSurvey = state$.value.scientistData.survey.selectedSurvey;
      const order = state$.value.scientistData.survey.order;
      await client.request(UPDATE_ORDER, {
        id: selectedSurvey,
        new_order: order,
      });
      return actions.deletedQuestion({
        lastDeleted: deletedAt,
      });
    })
  );

export const questionEditorEpic = combineEpics(
  createEpic,
  saveEpic,
  deleteEpic
);
