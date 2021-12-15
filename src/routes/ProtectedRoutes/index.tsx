import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "components/Authentification/hooks";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/global";
import { useAppSelector } from "redux/hooks";
import { useEffect } from "react";
export const ProtectedRoutes: React.FC = ({
  children,
  ...rest
}: RouteProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated, cookies } = useAuth();
  const isConnected = useAppSelector((state) => state.global.auth.isConnected);

  useEffect(() => {
    // Hydrate redux store with user data if not already done
    if (!isConnected) dispatch(actions.logged(cookies));
  }, [isConnected]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/connexion",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
