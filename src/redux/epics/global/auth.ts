import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { client, clientWithNoHeaders } from "api/gql-client";
import { LoginDocument, RegisterDocument } from "../queries/auth.gql.generated";

// // ----  LOGIN

const loginEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.login.type),
    switchMap(async (action) => {
      try {
        const { identifier, password } = action.payload;
        const res = await client.request(LoginDocument, {
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
      if (res?.response?.errors) {
        return actions.authFailed(res?.response?.errors);
      } else {
        return actions.logged(res);
      }
    })
  );

// // ----  SIGNIN

const signinEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.signin.type),
    switchMap(async (action) => {
      try {
        const { email, username, password } = action.payload;
        const res = await clientWithNoHeaders.request(RegisterDocument, {
          email,
          username,
          password,
        });
        if (res) {
          localStorage.setItem("process__user", JSON.stringify(res.register));
        }
        return res;
      } catch (error: any) {
        return error;
      }
    }),

    map((res) => {
      if (res?.response?.errors) {
        return actions.authFailed(res?.response?.errors);
      } else {
        return actions.signed(res.register);
      }
    })
  );

export const authEpics = combineEpics(loginEpic, signinEpic);
