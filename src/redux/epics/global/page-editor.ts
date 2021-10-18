import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions, selectors } from "redux/slices/global";

import { client } from "call/actions";
import {
  ADD_PAGE,
  DELETE_PAGE,
  UPDATE_PAGE,
} from "call/queries/formBuilder/page";

// ----  CREATE PAGE

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.createPage.type),
    switchMap(async (action) => {
      const { id } = action.payload;
      const pagesLength = selectors.pages.getAllPages(state$.value).length;
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
        return actions.createdPage({
          page: newPage.createPage.page,
          lastCreated: createdAt,
        });
      }
    )
  );

// ----  UPDATE PAGE

const updateEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.updatePage.type),
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
    map((updatedAt) => actions.updatedPage({ lastUpdated: updatedAt }))
  );

// ----  DELETE PAGE

const deleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.deletePage.type),
    switchMap(async (action) => {
      const pageId: string = action.payload;
      const deletedAt = new Date().toISOString();

      await client.request(DELETE_PAGE, {
        id: pageId,
      });

      return { deletedAt };
    }),
    map(({ deletedAt }) => {
      return actions.deletedPage({
        lastDeleted: deletedAt,
      });
    })
  );

export const pageEditorEpic = combineEpics(createEpic, updateEpic, deleteEpic);
