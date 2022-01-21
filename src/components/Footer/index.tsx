import { Center } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/logo_footer.svg";

import { useMediaQueries } from "utils/hooks/mediaqueries";

export const Footer: React.FC = () => {
  const { isTablet } = useMediaQueries();

  return (
    <Center
      backgroundColor="black"
      h="180px"
      color="white"
      d="flex"
      justifyContent="flex-start"
      px="2%"
    >
      {isTablet ? "" : <Logo />}
    </Center>
  );
};
