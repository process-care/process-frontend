import { Box, Text } from "@chakra-ui/react";
import { useCheckSurvey } from "call/actions/formBuider/condition";
import React from "react";
import { useAppSelector } from "redux/hooks";

export const Banner: React.FC = () => {
  const { condition_status } = useAppSelector((state) => state.formBuilder);
  const { data, isLoading, isError } = useCheckSurvey(condition_status);
  if (isLoading) {
    return (
      <Box
        w="100%"
        p="5px"
        backgroundColor="white"
        borderBottom="1px solid black"
      >
        <Text variant="current" color="black">
          Nous analysons les conditions ...
        </Text>
      </Box>
    );
  }
  if (data) {
    return (
      <Box w="100%" p="5px" backgroundColor="brand.green">
        <Text variant="current" color="white">
          C'est un succès !
        </Text>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box w="100%" p="5px" backgroundColor="brand.alert">
        <Text variant="current" color="brand.red">
          Une condition est erronnée ...
        </Text>
      </Box>
    );
  }
  return <></>;
};
