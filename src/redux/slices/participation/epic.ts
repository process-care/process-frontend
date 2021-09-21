
import { delay, mapTo } from 'rxjs';
import { ofType } from 'redux-observable';
import { Epic } from 'redux/store';

export const pingEpic: Epic = (action$) => action$.pipe(
  ofType('PING'),
  delay(Math.random() * 1000),
  mapTo({ type: 'PONG' })
);