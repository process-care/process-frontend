import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { selectCondition } from "redux/slices/formBuilder";

export const ConditionMenu: React.FC = () => {
  const { selected_page } = useAppSelector((state) => state.formBuilder);
  const dispatch = useAppDispatch();
  return (
    <Box p={4}>
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page{" "}
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {selected_page.name}{" "}
      </Text>
      <Box textAlign="left">
        <Box
          w="90%"
          mt={6}
          fontSize="10px"
          backgroundColor="brand.gray.100"
          p={2}
          textTransform="uppercase">
          Groupe condition 01
        </Box>
        <Text mt={2} fontSize="10" color="brand.gray.200">
          Si la question
        </Text>
      </Box>
      <Footer hideRequired onCancel={() => dispatch(selectCondition(null))} />
    </Box>
  );
};
