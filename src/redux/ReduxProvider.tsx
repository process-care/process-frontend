'use client'

import { store } from "./store/index.js";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
