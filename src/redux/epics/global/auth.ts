import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/global";
import { client } from "call/actions";

import { LOGIN } from "call/queries/auth";
import { LoginRes } from "call/actions/auth";

// // ----  LOGIN

const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.login.type),
    switchMap(async (action) => {
      try {
        const { identifier, password } = action.payload;
        const res: LoginRes = await client.request(LOGIN, {
          identifier,
          password,
        });
        if (res) {
          localStorage.setItem("process__user", JSON.stringify(res.login));
        }
        return res;
      } catch (error: any) {
        return error;
      }
    }),

    map((res) => {
      console.log(res);
      if (res?.response?.errors) {
        return actions.authFailed(res?.response?.errors);
      } else {
        return actions.logged(res);
      }
    })
  );

export const authEpics = combineEpics(loginEpic);
