import React from "react";

export default interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: React.ReactNode;
  props?: unknown;
}
