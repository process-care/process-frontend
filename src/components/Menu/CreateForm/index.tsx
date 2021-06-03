import { Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { mockForm } from "redux/slices/formBuilder";
import { ReactComponent as Back } from "./assets/back.svg";

export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      pos="relative"
      p={4}
      borderBottom="1px"
      justifyContent="flex-start"
      alignItems="center">
      <NavLink to="/dashboard">
        <Flex ml="50px" alignItems="center">
          <Back />
          <Text fontSize="12px" ml={2} mr="105px">
            Dashboard
          </Text>
        </Flex>
      </NavLink>

      <Text fontSize="12px">TITRE DU FORMULAIRE</Text>
      <Button
        pos="absolute"
        right="10px"
        variant="link"
        onClick={() => dispatch(mockForm())}>
        Mock
      </Button>
    </Flex>
  );
};
