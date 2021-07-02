import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (
  ui: React.ReactElement,
  answers?: RenderOptions
): unknown => render(ui, { wrapper: AllProviders, ...answers });

export { customRender as render };
