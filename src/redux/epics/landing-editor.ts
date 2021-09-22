import { map, tap, switchMap } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { Epic } from 'redux/store';
import { actions } from 'redux/slices/landing-editor';

import { client } from 'call/actions';
import { GET_LANDING } from 'call/queries/landing';

// Watches over "load" landing
const loadEpic: Epic = (action$) => action$.pipe(
  ofType(actions.load.type),
  tap(act => console.log('received load event :', act)),
  switchMap(action => client.request(GET_LANDING, { id: action.payload })),
  map(result => {
    const payload = result.landing;
    return actions.loaded(payload);
  }),
);

// Watches over any "update" for the landing
const updateEpic: Epic = (action$) => action$.pipe(
  ofType('PING'),
  tap(act => console.log('received load event :', act)),
  switchMap(action => client.request(GET_LANDING, { id: action.payload })),
  map(result => {
    const payload = result.landing;
    return actions.loaded(payload);
  }),
);

export const landingEditorEpics = combineEpics(loadEpic, updateEpic);