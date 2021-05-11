import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  theme,
} from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import theme from "theme";
import { Layout } from "components/Layout";
import routes from "routes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <CSSReset />
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Layout>
              <Switch>
                {routes.map(({ name, path, exact, component }) => {
                  return (
                    <Route
                      key={name}
                      path={path}
                      exact={exact}
                      component={() => component}
                      strict
                    />
                  );
                })}
              </Switch>
            </Layout>
          </BrowserRouter>
        </DndProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
