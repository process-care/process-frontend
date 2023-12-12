import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store/index.js"
import { actions } from "@/redux/slices/scientistData.js"

import { sdk } from "@/api/gql-client.js"
import { CreateQuestionMutation } from "@/api/graphql/sdk.generated.js"
import { sanitizeEntity } from "@/api/entity-checker.js"

// ----  CREATE QUESTION

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.createQuestion.type),
    switchMap(async (action) => {
      const { type } = action.payload
      const createdAt = new Date().toISOString()
      
      const selectedPageId = state$.value.scientistData.pages.selectedPage
      const newQuestion = await sdk.createQuestion({
        values: {
          type,
          page: selectedPageId,
        },
      })

      return { newQuestion, createdAt }
    }),
    map(({ newQuestion, createdAt }: { newQuestion: CreateQuestionMutation; createdAt: string }) => {
      const data = newQuestion?.createQuestion?.data
      const type = data?.attributes?.type
      const id = data?.id

      const question = {
        attributes: { ...data?.attributes, internal_title: `${type}-${id}` },
        id,
      }

      return actions.createdQuestion({
        question: sanitizeEntity(question),
        lastCreated: createdAt,
      })
    })
  )

// // ----  SAVE QUESTION

const saveEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.saveQuestion.type),
    switchMap(async (action) => {
      const savedAt: string = new Date().toISOString();
      const selectedQuestionId = state$.value.scientistData.questions.selectedQuestion;
      const selectedQuestion = state$.value.scientistData.questions.entities[selectedQuestionId];
      const selectedSurvey = state$.value.scientistData.survey.selectedSurvey;
      const order = state$.value.scientistData.survey.order;

      const changes = { ...action.payload.changes };
      changes.page = changes.page.id;
      changes.id = undefined;
      changes.conditions = undefined;
      // TODO: change the hack to send the internal title only when it is modify

      await sdk.updateQuestion({
        id: selectedQuestionId,
        data: {
          ...changes,
          internal_title: selectedQuestion?.attributes.internal_title,
        },
      });

      await sdk.updateOrder({
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

      await sdk.deleteQuestion({ id });

      return deletedAt;
    }),
    switchMap(async (deletedAt) => {
      const selectedSurvey = state$.value.scientistData.survey.selectedSurvey;
      const order = state$.value.scientistData.survey.order;

      await sdk.updateOrder({
        id: selectedSurvey,
        new_order: order,
      });

      return actions.deletedQuestion({
        lastDeleted: deletedAt,
      });
    })
  );

export const questionEditorEpic = combineEpics(createEpic, saveEpic, deleteEpic);
