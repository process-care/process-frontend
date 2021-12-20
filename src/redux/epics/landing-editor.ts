import { map, switchMap, scan, debounceTime } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/landing-editor";

import { client } from "call/actions";
import { GET_LANDING, UPDATE_LANDING } from "call/queries/landing";

// Watches over "load" landing
const loadEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.load.type),
    switchMap((action) => client.request(GET_LANDING, { id: action.payload })),
    map((result) => {
      const payload = result.landing;
      return actions.loaded(payload);
    })
  );

// Watches over any "update" for the landing
const updateEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.update.type),
    map((action) => action.payload),
    scan((acc, payload) => Object.assign({}, acc, payload), {}),
    debounceTime(5000),
    switchMap(async (accumulated) => {
      const currentLandingId = state$.value.landingEditor.data?.id;

      if (!currentLandingId) {
        throw new Error("No Landing ID to save the modifications to.");
      }

      const savingAt = new Date().toISOString();
      const data = { ...accumulated, id: undefined };
      console.log("Saving to DB:", data);
      await client.request(UPDATE_LANDING, { id: currentLandingId, data });
      return savingAt;
    }),
    map((savedDate) => actions.updated({ lastSaved: savedDate }))
  );

export const landingEditorEpics = combineEpics(loadEpic, updateEpic);
