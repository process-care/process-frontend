import { Box, Grid } from "@chakra-ui/react";
import React from "react";

import { ColorModeSwitcher } from "ColorModeSwitcher";

import MainMenu from "../MainMenu";

export const Layout: React.FC = ({ children }: React.ReactChild) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <MainMenu />
        {children}
      </Grid>
    </Box>
  );
};
