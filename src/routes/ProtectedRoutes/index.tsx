import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "components/Authentification/hooks";

export const ProtectedRoutes: React.FC = ({
  children,
  ...rest
}: RouteProps) => {
  const { isAuthenticated } = useAuth();
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
