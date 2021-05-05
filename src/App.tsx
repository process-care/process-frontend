import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "theme";
import { Layout } from "components/Layout";
import routes from "routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
