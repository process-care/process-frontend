import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";

import { client } from "api/gql-client";
import { CreateQuestionDocument, UpdateQuestionDocument, DeleteQuestionDocument } from "api/graphql/queries/question.gql.generated";
import { UpdateOrderDocument } from "api/graphql/queries/survey.gql.generated";

// ----  CREATE QUESTION

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.createQuestion.type),
    switchMap(async (action) => {
      const { type } = action.payload;
      const createdAt = new Date().toISOString();
      const selectedPageId = state$.value.scientistData.pages.selectedPage;
      const newQuestion = await client.request(CreateQuestionDocument, {
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
      changes.conditions = changes.conditions?.map(
        // TODO: fix the `any` type
        (cond: any) => cond.id
      );

      console.log("SAVE QUESTION", action.payload.changes);
      // TODO: change the hack to send the internal title only when it is modified

      await client.request(UpdateQuestionDocument, {
        id: selectedQuestionId,
        data: {
          ...changes,
          internal_title: selectedQuestion?.internal_title,
        },
      });
      await client.request(UpdateOrderDocument, {
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
      await client.request(DeleteQuestionDocument, {
        id,
      });

      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      const selectedSurvey = state$.value.scientistData.survey.selectedSurvey;
      const order = state$.value.scientistData.survey.order;
      await client.request(UpdateOrderDocument, {
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
