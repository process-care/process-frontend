import { CheckIcon } from "@chakra-ui/icons";
import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { ReactComponent as Back } from "./assets/back.svg";

interface Props {
  surveyTitle?: string | null | undefined;
}

export const Menu: React.FC<Props> = ({ surveyTitle }) => {
  const { isSaving } = useAppSelector((state) => state.application);
  const { isTablet } = useMediaQueries();
  return (
    <Flex pos="relative" p={5} borderBottom="1px" justifyContent="flex-start" alignItems="center">
      <NavLink to={`/dashboard`}>
        <Flex ml={isTablet ? "0" : "50px"} alignItems="center">
          <Back />
          <Text fontSize="12px" ml={2} mr="30px">
            Dashboard
          </Text>
        </Flex>
      </NavLink>
      <Text fontSize="12px" textTransform="uppercase" isTruncated maxWidth="250px">
        {surveyTitle}
      </Text>
      {isSaving && (
        <Text variant="xs" mr="40px" color="brand.green" pos="absolute" right="0">
          <CheckIcon mr="7px" />
          Modification sauvegardée
          <CircularProgress ml={2} isIndeterminate color="brand.green" size="2" />
        </Text>
      )}
    </Flex>
  );
};
