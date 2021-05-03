import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";

import MainMenu from "./Menu/MainMenu";

export const Layout: React.FunctionComponent = ({
  children,
}: React.ReactChild) => {
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
