import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/formEditor/question-editor";

import { client } from "call/actions";

import {
  ADD_QUESTION,
  DELETE_QUESTION,
  GET_QUESTIONS,
  UPDATE_QUESTION,
} from "call/queries/formBuilder/question";
import { UPDATE_ORDER } from "call/queries/survey";
import { getNewOrder } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/utils";

// ---- INITIALIZE QUESTIONS

const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      return client.request(GET_QUESTIONS, { page_id: action.payload });
    }),
    map((result) => {
      const payload = result.questions;
      return actions.initialized(payload);
    })
  );

// ----  CREATE QUESTION

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.create.type),
    switchMap(async (action) => {
      const { type } = action.payload;
      const createdAt = new Date().toISOString();
      const selectedPage = state$.value.formEditor.pages.selectedPage;
      const newQuestion = await client.request(ADD_QUESTION, {
        values: {
          type,
          page: selectedPage,
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
        const { type, id } = newQuestion.createQuestion.question;
        return actions.created({
          question: {
            ...newQuestion.createQuestion.question,
            internal_title: `${type}-${id}`,
          },
          lastCreated: createdAt,
        });
      }
    )
  );

// // ----  SAVE QUESTION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.save.type),
    switchMap(async (action) => {
      const savedAt: string = new Date().toISOString();
      const selectedQuestionId =
        state$.value.formEditor.questions.selectedQuestion;
      const selectedQuestion =
        state$.value.formEditor.questions.entities[selectedQuestionId];
      const selectedSurvey = state$.value.formEditor.selectedSurvey.survey;
      const selectedPage = state$.value.formEditor.pages.selectedPage;

      // TODO: change the hack to send the internal title only when it is modify
      await client.request(UPDATE_QUESTION, {
        id: selectedQuestionId,
        data: {
          ...action.payload.changes,
          internal_title: selectedQuestion?.internal_title,
        },
      });
      await client.request(UPDATE_ORDER, {
        id: selectedSurvey.id,
        new_order: getNewOrder(
          selectedSurvey,
          selectedPage,
          selectedQuestionId
        ),
      });
      return savedAt;
    }),
    map((savedAt) => actions.saved({ lastSaved: savedAt }))
  );

// // ----  DELETE QUESTION

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

export const questionEditorEpic = combineEpics(
  initializeEpic,
  createEpic,
  saveEpic,
  deleteEpic
);
