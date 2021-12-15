import { LoginRes } from "call/actions/auth";

export const useAuth: any = () => {
  const data = localStorage.getItem("process__user");

  if (data) {
    const cookies: LoginRes["login"] = JSON.parse(data);
    return {
      cookies,
      isAuthenticated: !cookies.user?.blocked && !!cookies.jwt,
    };
  } else {
    return {
      user: null,
      jwt: null,
      isAuthenticated: false,
    };
  }
};
