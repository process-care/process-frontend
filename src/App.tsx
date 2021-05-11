import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "theme";
import { Layout } from "components/Layout";
import routes from "routes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default App;
