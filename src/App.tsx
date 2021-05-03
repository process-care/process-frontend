import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import routes from "routes";
import { Layout } from "components/Layout";

const App: React.FunctionComponent = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />

          <BrowserRouter>
            <Layout>
              <Switch>
                {routes.map(({ name, path, exact, component }) => {
                  return (
                    <Route
                      key={name}
                      path={path}
                      exact={exact}
                      render={() => component}
                      strict
                    />
                  );
                })}
              </Switch>
            </Layout>
          </BrowserRouter>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
