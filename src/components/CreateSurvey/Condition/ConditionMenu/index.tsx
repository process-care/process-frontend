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
  const conditions = useAppSelector(getConditionData);
  const dispatch = useAppDispatch();
  console.log("all cond in page", conditions);
  return (
    <Box p={4} h="100%">
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {currentConditionPage?.name}
      </Text>
      {conditions?.map(
        ({ selected_question, operator, target_value }, index) => {
          return (
            <Box textAlign="left">
              <Box
                w="90%"
                mt={10}
                fontSize="10px"
                backgroundColor="brand.gray.100"
                p={2}
                textTransform="uppercase">
                Groupe condition {index}
              </Box>
              <Text mt={2} fontSize="10" color="brand.gray.200">
                Si la question de type : {selected_question?.name}
              </Text>
              <Text mt={2} fontSize="10" color="brand.gray.200">
                {selected_question?.label}
              </Text>
              <Text mt={2} fontSize="10" color="brand.gray.200">
                {operator?.name}
              </Text>
              <Text mt={2} fontSize="10" color="brand.gray.200">
                {target_value}
              </Text>
            </Box>
          );
        }
      )}
      <Footer
        hideRequired
        onCancel={() => dispatch(selectCondition({ id: "" }))}
      />
    </Box>
  );
};
