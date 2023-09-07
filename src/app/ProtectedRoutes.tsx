// import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
// import { useAuth } from "components/Authentification/hooks";
// import { useDispatch } from "react-redux";
// import { actions } from "redux/slices/scientistData";
// import { useAppSelector } from "redux/hooks";
// import { useEffect } from "react";

// export const ProtectedRoutes: React.FC = ({ children, ...rest }: RouteProps) => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const { isAuthenticated, cookies } = useAuth();
//   const isConnected = useAppSelector((state) => state.scientistData.auth.isConnected);

//   // Hydrate redux store with user data if not already done
//   useEffect(() => {
//     if (!isConnected) dispatch(actions.logged(cookies));
//   }, [isConnected]);

//   // User is not authenticated
//   if (!isAuthenticated) {
//     const to = { pathname: "/connexion", state: { from: location } };
//     return <Redirect to={to} />;
//   }

//   // User is not validated yet
//   if (!cookies.user.validated && location.pathname !== "/attente-de-validation") {
//     const to = { pathname: "/attente-de-validation", state: { from: location } };
//     return <Redirect to={to} />;
//   }

//   // User is okay !
//   return <Route {...rest}>{children}</Route>;
// };
