import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions, selectors } from "redux/slices/scientistData";
import { sanitizeEntity } from "api/entity-checker";
import { sdk } from "api/gql-client";
import { AddPageMutation } from "api/graphql/sdk.generated";

// ----  CREATE PAGE

const createEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.createPage.type),
    switchMap(async (action) => {
      const { id } = action.payload;
      const pagesLength = selectors.pages.getPages(state$.value).length;

      const pageData = {
        name: `Page ${pagesLength + 1}`,
        is_locked: false,
        short_name: `P${pagesLength + 1}`,
        survey: id,
        conditions: [],
        questions: [],
      };
      const createdAt = new Date().toISOString();

      const newPage = await sdk.addPage({
        values: pageData,
      });

      return { newPage, createdAt };
    }),
    map(({ newPage, createdAt }: { newPage: AddPageMutation; createdAt: string }) => {
      if (!newPage.createPage?.data) {
        return actions.error("Error while creating page");
      } else
        return actions.createdPage({
          page: sanitizeEntity(newPage?.createPage?.data),
          lastCreated: createdAt,
        });
    })
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
      console.log("accumulated", accumulated);
      await sdk.updatePage({
        id: accumulated.id,
        data: accumulated.changes?.attributes,
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

      await sdk.deletePage({ id: pageId });

      return { deletedAt };
    }),
    map(({ deletedAt }) => {
      return actions.deletedPage({
        lastDeleted: deletedAt,
      });
    })
  );

export const pageEditorEpic = combineEpics(createEpic, updateEpic, deleteEpic);
