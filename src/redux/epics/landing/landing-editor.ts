import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/landing-editor";
import { sdk } from "api/gql-client";
import { sanitizeEntity } from "api/entity-checker";

// Watches over "load" landing
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.load.type),
    switchMap(async (action) => {
      const landing = await sdk.landing({ id: action.payload }).then((res) => res.landing?.data);
      if (landing) return sanitizeEntity(landing);
    }),
    map((landing) => {
      if (landing) return actions.loaded(landing);
      else return actions.loadFailed();

      // TODO:ERROR: Handle error
    })
  );

// Watches over any "update" for the landing
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(500),
    switchMap(async (accumulated: any) => {
      const currentLandingId = state$.value.editor.landing.data?.id;

      if (!currentLandingId) {
        throw new Error("No Landing ID to save the modifications to.");
      }

      const savingAt = new Date().toISOString();
      const attributes = accumulated?.changes?.attributes;
      // Change cover data to match correct LandingInput type
      const data = { ...attributes, cover: attributes?.cover?.data?.id };

      await sdk.updateLanding({ id: currentLandingId, data });
      return savingAt;
    }),
    map((savedDate) => actions.updated({ lastSaved: savedDate }))
  );

export const landingEditorEpics = combineEpics(loadEpic, updateEpic);
