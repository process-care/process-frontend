import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Back } from "./assets/back.svg";

interface Props {
  surveyTitle?: string;
}

export const Menu: React.FC<Props> = ({ surveyTitle }) => {
  return (
    <Flex
      pos="relative"
      p={5}
      borderBottom="1px"
      justifyContent="flex-start"
      alignItems="center"
    >
      <NavLink to="/dashboard">
        <Flex ml="50px" alignItems="center">
          <Back />
          <Text fontSize="12px" ml={2} mr="30px">
            Dashboard
          </Text>
        </Flex>
      </NavLink>
      <Text
        fontSize="12px"
        textTransform="uppercase"
        isTruncated
        maxWidth="250px"
      >
        {surveyTitle}
      </Text>
    </Flex>
  );
};
