interface Cookie {
  jwt: string;
  user: {
    id: string;
    email: string;
    username: string;
    blocked: boolean;
  };
}

export const useAuth: any = () => {
  const data = localStorage.getItem("process__user");
  if (data) {
    const cookies: Cookie = JSON.parse(data);
    return {
      user: cookies.user,
      jwt: cookies.jwt,
      isAuthenticated: !cookies.user.blocked,
    };
  } else {
    return {
      user: null,
      jwt: null,
      isAuthenticated: false,
    };
  }
};
