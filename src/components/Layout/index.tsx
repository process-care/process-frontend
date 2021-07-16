import { Box } from "@chakra-ui/react";
import { DashboardMenu } from "components/Menu/DashboardMenu";
import React from "react";
import { useLocation } from "react-router-dom";

import MainMenu from "../MainMenu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const renderMenu = () => {
    switch (pathname) {
      case "/create-survey/create-form":
        return null;
      case "/create-survey/create-landing":
        return null;
      case "/dashboard":
        return <DashboardMenu />;

      default:
        return <MainMenu />;
    }
  };
  return (
    <Box textAlign="center" fontSize="xl">
      {renderMenu()}
      {children}
    </Box>
  );
};
