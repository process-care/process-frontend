import React from "react";
import MainMenu from "./Menu/MainMenu";

export const Layout: React.FunctionComponent = ({
  children,
}: React.ReactChild) => {
  return (
    <div>
      <MainMenu />
      {children}
    </div>
  );
};
