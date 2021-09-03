import { Box } from "@chakra-ui/react";
import { Footer } from "components/Footer";
import { SimpleMenu } from "components/Menu/SimpleMenu";
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
    const isSurveyPages = pathname.search("/survey/") !== -1;

    if (pathname === "/dashboard") return <SimpleMenu />;
    if (pathname === "/") return <SimpleMenu isPortail />;
    else if (isSurveyPages) return null;
    else return <MainMenu />;
  };

  const renderFooter = () => {
    if (pathname === "/") return <Footer />;
  };

  return (
    <Box textAlign="center" fontSize="xl">
      {renderMenu()}
      {children}
      {renderFooter()}
    </Box>
  );
};
