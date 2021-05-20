import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Back } from "./assets/back.svg";

export const Menu: React.FC = () => {
  return (
    <Flex
      p={4}
      borderBottom="1px"
      justifyContent="flex-start"
      alignItems="center">
      <NavLink to="/dashboard">
        <Flex ml="50px" alignItems="center">
          {" "}
          <Back />
          <Text fontSize="12px" ml={2} mr="105px">
            Dashboard
          </Text>
        </Flex>
      </NavLink>

      <Text fontSize="12px">TITRE DU FORMULAIRE</Text>
    </Flex>
  );
};
