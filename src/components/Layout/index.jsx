import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";

import MainMenu from "../MainMenu";

export const Layout: React.FC = ({ children }: React.ReactChild) => {
  const location = useLocation();
  const { pathname } = location;

  const renderMenu = () => {
    switch (pathname) {
      case "/create-survey/create-form":
        return null;

      default:
        return <MainMenu />;
    }
  };
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        {renderMenu()}
        {children}
      </Grid>
    </Box>
  );
};
