import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions, selectors } from "redux/slices/formEditor/page-editor";

import { client } from "call/actions";
import { GET_SURVEY_BY_SLUG } from "call/queries/survey";
import {
  ADD_PAGE,
  DELETE_PAGE,
  UPDATE_PAGE,
} from "call/queries/formBuilder/page";

// ---- INITIALIZE PAGES

const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) => {
      return client.request(GET_SURVEY_BY_SLUG, { slug: action.payload });
    }),
    map((survey: Record<string, any>) => {
      console.log("INITIALIZE PAGES");

      const payload = survey.surveys[0].pages;
      return actions.initialized(payload);
    })
  );

// ----  CREATE PAGE

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.create.type),
    switchMap(async (action) => {
      const { id } = action.payload;
      const pagesLength = selectors.getAllPages(state$.value).length;
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
      }
    )
  );

// ----  UPDATE PAGE

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.update.type),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(3000),
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
      const pageId: string = action.payload;
      const deletedAt = new Date().toISOString();

      await client.request(DELETE_PAGE, {
        id: pageId,
      });

      return { deletedAt };
    }),
    map(({ deletedAt }) => {
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
