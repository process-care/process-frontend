import { map, switchMap, scan } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions, selectors } from "redux/slices/page-editor";

import { client } from "call/actions";
import { GET_SURVEY } from "call/queries/survey";
import { ISurveyRes } from "types/survey";
import {
  ADD_PAGE,
  DELETE_PAGE,
  UPDATE_PAGE,
} from "call/queries/formBuilder/page";

// ---- INITIALIZE PAGES

const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    // TODO: Check if survey is not in redux / if here do not query it
    switchMap((action) => client.request(GET_SURVEY, { id: action.payload })),
    map((survey: ISurveyRes) => {
      const payload = survey.survey.pages;
      return actions.initialized(payload);
    })
  );

// ----  CREATE PAGE

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.create.type),
    switchMap(async (action) => {
      const { id } = action.payload;
      const pagesLength = selectors.pages(state$.value).length;
      const pageData = {
        name: `Page ${pagesLength + 1}`,
        is_locked: false,
        short_name: `P${pagesLength + 1}`,
        survey: id,
        conditions: [],
        questions: [],
      };
      const createdAt = new Date().toISOString();
      const newPage = await client.request(ADD_PAGE, {
        values: pageData,
      });

      return { newPage, createdAt };
    }),
    map(
      ({
        newPage,
        createdAt,
      }: {
        newPage: Record<string, any>;
        createdAt: string;
      }) => {
        return actions.created({
          page: newPage.createPage.page,
          lastCreated: createdAt,
        });
        // TODO: Select it !
      }
    )
  );

// ----  UPDATE PAGE

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.update.type),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    // debounceTime(5000),
    // TODO: Need to remove because it is not working, if we change a lot of page it doesnot update all
    switchMap(async (accumulated: any) => {
      const updatedAt: string = new Date().toISOString();

      await client.request(UPDATE_PAGE, {
        id: accumulated.id,
        data: accumulated.changes,
      });
      return updatedAt;
    }),
    map((updatedAt) => actions.updated({ lastUpdated: updatedAt }))
  );

// ----  DELETE PAGE

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.delete.type),
    switchMap(async (action) => {
      // TODO: Get the survey id directly from the redux state
      const id: string = action.payload;
      const deletedAt = new Date().toISOString();
      await client.request(DELETE_PAGE, {
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

export const pageEditorEpic = combineEpics(
  initializeEpic,
  createEpic,
  updateEpic,
  deleteEpic
);
