import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/ToolBox/InputForm/Template/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  getPageInCurrentCondition,
  selectCondition,
  getConditionData,
} from "redux/slices/formBuilder";

export const ConditionMenu: React.FC = () => {
  const currentConditionPage = useAppSelector(getPageInCurrentCondition);
  const currentCondition = useAppSelector(getConditionData);
  console.log(currentCondition);
  const dispatch = useAppDispatch();
  return (
    <Box p={4} h="100%">
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {currentConditionPage?.name}
      </Text>
      <Box textAlign="left" h="100%">
        <Box
          w="90%"
          mt={10}
          fontSize="10px"
          backgroundColor="brand.gray.100"
          p={2}
          textTransform="uppercase">
          Groupe condition 01
        </Box>
        <Text mt={2} fontSize="10" color="brand.gray.200">
          Si la question de type : {currentCondition?.selected_question?.name}
        </Text>
        <Text mt={2} fontSize="10" color="brand.gray.200">
          {currentCondition?.selected_question?.label}
        </Text>
        <Text mt={2} fontSize="10" color="brand.gray.200">
          {currentCondition?.operator?.name}
        </Text>
        <Text mt={2} fontSize="10" color="brand.gray.200">
          {currentCondition?.target_value}
        </Text>
      </Box>
      <Footer hideRequired onCancel={() => dispatch(selectCondition(null))} />
    </Box>
  );
};
