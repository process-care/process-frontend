import { Flex, Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { mockForm } from "redux/slices/formBuilder";
import { ReactComponent as Back } from "./assets/back.svg";
import { t } from "static/input";
export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { survey_id } = useAppSelector(state => state.formBuilder.selected_page);

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

      <Text fontSize="12px" textTransform="uppercase" isTruncated maxWidth="100px">{survey_id}</Text>
      <Box pos="absolute" right="10px">
        <Button variant="roundedTransparent" mr={5}>
          {t.save}
        </Button>
        <Button variant="rounded" mr={5}>
          {t.publish}
        </Button>
        <Button variant="roundedBlue" mr={5}>
          {t.verify}
        </Button>
        <Button variant="link" onClick={() => dispatch(mockForm())}>
          Mock
        </Button>
      </Box>
    </Flex>
  );
};
