import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/surveys";

import { client } from "call/actions";
import { GET_MY_SURVEYS } from "call/queries/survey";

// Watches over "initialize" surveys
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initialize.type),
    switchMap((action) =>
      client.request(GET_MY_SURVEYS, { authorId: action.payload })
    ),
    map((result) => {
      const payload = result.surveys;
      return actions.initialized(payload);
    })
  );

export const surveysEpics = combineEpics(initializeEpic);
