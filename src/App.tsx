import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import theme from "theme";
import { Layout } from "components/Layout";
import { routes } from "routes";
import { protectedRoutes } from "routes";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import "index.css";
import { ProtectedRoutes } from "routes/ProtectedRoutes";
import { ConnectedRouter } from "connected-react-router";
import { history } from "redux/store/history";

export const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
          <CSSReset />
          <DndProvider backend={HTML5Backend}>
            <ConnectedRouter history={history}>
              <Layout>
                <Switch>
                  {routes.map(({ name, path, exact, component }) => {
                    return (
                      <Route
                        key={name}
                        path={path}
                        exact={exact}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        component={() => component}
                        strict
                      />
                    );
                  })}
                  <ProtectedRoutes>
                    {protectedRoutes.map(({ name, path, exact, component }) => {
                      return (
                        <Route
                          key={name}
                          path={path}
                          exact={exact}
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          component={() => component}
                          strict
                        />
                      );
                    })}
                  </ProtectedRoutes>
                </Switch>
              </Layout>
            </ConnectedRouter>
          </DndProvider>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
