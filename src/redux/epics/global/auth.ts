import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { sdk } from "api/gql-client";

// // ----  LOGIN

const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.login.type),
    switchMap(async (action) => {
      try {
        const { identifier, password } = action.payload;
        const res = await sdk.login({
          identifier,
          password,
        });

        if (res) {
          localStorage.setItem("process__user", JSON.stringify(res.login));
        }

        return { user: res };
      } catch (error: any) {
        return { error };
      }
    }),

    map((res) => {
      if (res.user) {
        return actions.logged(res.user.login);
      }

      return actions.authFailed(res.error?.response?.errors);
    })
  );

// // ----  SIGNIN

const signinEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.signin.type),
    switchMap(async (action) => {
      try {
        const { email, username, password } = action.payload;
        const res = await sdk.register({ email, username, password });

        if (res) {
          localStorage.setItem("process__user", JSON.stringify(res.register));
        }
        return {
          user: res,
        };
      } catch (error: any) {
        return { error };
      }
    }),

    map((res) => {
      if (res.user) {
        return actions.signed(res.user.register);
      } else {
        return actions.authFailed(res?.error?.response?.errors);
      }
    })
  );

export const authEpics = combineEpics(loginEpic, signinEpic);
