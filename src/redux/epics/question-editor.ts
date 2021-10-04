import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/question-editor";

import { client } from "call/actions";

import {
  ADD_QUESTION,
  DELETE_QUESTION,
  GET_QUESTIONS,
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
      const selectedSurveyId = state$.value.formEditor.survey.survey.id;
      const selectedSurvey = state$.value.formEditor.survey.survey;
      const newQuestion = await client.request(ADD_QUESTION, {
        values: {
          type,
          page: selectedPage,
        },
      });

      const newQuestionId = newQuestion.createQuestion.question.id;
      if (newQuestionId) {
        await client.request(UPDATE_ORDER, {
          id: selectedSurveyId,
          new_order: getNewOrder(selectedSurvey, selectedPage, newQuestionId),
        });
      }

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

// // ----  UPDATE QUESTION

// const updateEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType(actions.update.type),
//     map((action) => action.payload),
//     scan((acc, payload) => Object.assign({}, acc, payload), {}),
//     debounceTime(1000),
//     switchMap(async (accumulated: any) => {
//       const updatedAt: string = new Date().toISOString();
//       await client.request(UPDATE_PAGE, {
//         id: accumulated.id,
//         data: accumulated.changes,
//       });
//       return updatedAt;
//     }),
//     map((updatedAt) => actions.updated({ lastUpdated: updatedAt }))
//   );

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
      //  const new_order = survey?.order.filter(
      //    (id) => id !== selectedQuestion.id
      //  );
      //  await updateOrder({ id: survey?.id, new_order });
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
  //   updateEpic,
  deleteEpic
);
