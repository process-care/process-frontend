import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { client, sdk } from "api/gql-client";
import { hasMessage } from "utils/typeguards";

// ----  LOGIN

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

        console.log("login: ", res);

        if (res) {
          client.setHeader("Authorization", buildBearer(res.login.jwt));
          localStorage.setItem("process__user", JSON.stringify(res.login));
        }

        return { user: res };
      } catch (error: any) {
        return { error };
      }
    }),
    map((res) => {
      // TODO: If the user is not confirmed yet

      // If user is correclty logged
      if (res.user) return actions.logged(res.user.login);

      // Fail in any other cases
      return actions.authFailed(res.error?.response?.errors);
    })
  );

// ----  SIGNIN

const signinEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.signin.type),
    switchMap(async (action) => {
      try {
        const { email, username, password } = action.payload;
        const res = await sdk.register({ email, username, password });

        if (res) {
          client.setHeader("Authorization", buildBearer(res.register.jwt));
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

// ---- REFRESH

const refreshingEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.refresh.type),
    switchMap(async (_action) => {
      try {
        // Get updated info
        const res = await sdk.me();
        if (!res.me) throw new Error("No user found during refreh...");

        return { me: res.me };
      } catch (err) {
        return { error: err };
      }
    }),
    map((res) => {
      if (res.error) {
        const msg = hasMessage(res.error) ? res.error.message : "Error while refreshing user";
        return actions.authFailed(msg);
      }

      // Refresh local storage with it
      console.log("found user: ", res.me);

      const storedUser = JSON.parse(localStorage.getItem("process__user") ?? "");
      const updated = { ...storedUser, user: { ...storedUser.user, ...res.me } };
      localStorage.setItem("process__user", JSON.stringify(updated));

      return actions.refreshed(updated);
    })
  );

// ---- UTILS

function buildBearer(jwt: string | undefined | null) {
  return jwt && jwt.length > 0 ? `Bearer ${jwt}` : "";
}

// ---- EXPORT

export const authEpics = combineEpics(loginEpic, signinEpic, refreshingEpic);
