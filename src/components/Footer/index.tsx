import { Center } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/logo_footer.svg";

export const Footer: React.FC = () => {
  return (
    <Center
      backgroundColor="black"
      h="180px"
      color="white"
      d="flex"
      justifyContent="flex-start"
      px="2%"
    >
      <Logo />
    </Center>
  );
};
