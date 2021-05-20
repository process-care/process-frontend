import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "theme";
import { Layout } from "components/Layout";
import routes from "routes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "redux/store";
import { Provider } from "react-redux";

import "index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
