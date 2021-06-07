import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ICondition from "interfaces/form/condition";

interface Props {
  conditions: ICondition[] | [];
  groups: number[];
}

export const Group: React.FC<Props> = ({ conditions, groups }) => {
  const g = groups.filter((item, index) => groups.indexOf(item) === index);
  console.log(g);
  return (
    <Box p={4} h="100%">
      {g.map((el: number) => {
        return (
          <Box mt={10}>
            <Text mt={4} fontSize="12px">
              OU
            </Text>

            <Box
              w="90%"
              fontSize="10px"
              backgroundColor="brand.gray.100"
              p={2}
              textTransform="uppercase">
              Groupe condition {el}
            </Box>
            {conditions?.map((condition: ICondition) => {
              if (condition.group === el) {
                return (
                  <Box textAlign="left" key={condition.id}>
                    <Text mt={2} fontSize="10" color="brand.gray.200">
                      Si la question de type :{" "}
                      {condition.selected_question?.name}
                    </Text>
                    <Text mt={2} fontSize="10" color="brand.gray.200">
                      {condition.selected_question?.label}
                    </Text>
                    <Text mt={2} fontSize="10" color="brand.gray.200">
                      {condition.operator?.name}
                    </Text>
                    <Text mt={2} fontSize="10" color="brand.gray.200">
                      {condition.target_value}
                    </Text>
                    <Text fontSize="12px" textAlign="center">
                      ET
                    </Text>
                  </Box>
                );
              }
            })}
          </Box>
        );
      })}
    </Box>
  );
};
