import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ICondition from "interfaces/form/condition";
import { renderOperator } from "./utils";
import { Separator } from "../Separator";

interface Props {
  conditions: ICondition[] | [];
  groups: number[];
  last_group: number;
}

export const Group: React.FC<Props> = ({ conditions, groups, last_group }) => {
  const clean_groups = groups.filter(
    (item, index) => groups.indexOf(item) === index
  );
  return (
    <Box p={4} h="100%">
      {clean_groups.map((el: number) => {
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
              textAlign="left"
              textTransform="uppercase"
              mb={2}>
              Groupe condition {el}
            </Box>
            {conditions?.map((condition: ICondition, index: number) => {
              const isLast = index === conditions.length - 1;
              if (condition.group === el) {
                return (
                  <Box textAlign="left" key={condition.id} py={1}>
                    <Text fontSize="10" color="brand.gray.200">
                      Si la question
                    </Text>
                    <Text fontSize="14" fontWeight="bold" color="black">
                      {condition.selected_question?.label}
                    </Text>
                    {condition.operator?.id && (
                      <Flex>
                        <Text
                          h="8"
                          w="fit-content"
                          minW="25px"
                          mt={2}
                          fontSize="10"
                          color="white"
                          fontWeight="bold"
                          backgroundColor="black"
                          borderRadius="4"
                          textAlign="center"
                          p="2">
                          {renderOperator(condition.operator?.id)}
                        </Text>
                        <Box ml={2}>
                          <Text mt={2} fontSize="10" color="brand.gray.200">
                            la réponse
                          </Text>
                          <Text fontSize="14" color="black">
                            {condition.target_value}
                          </Text>
                        </Box>
                      </Flex>
                    )}
                    <Separator value="ET" isLast={isLast} />
                    <Flex justifyContent="flex-end">
                      {isLast && (
                        <Button variant="link" opacity={0.2} fontSize="10">
                          Ajouter une condtion
                        </Button>
                      )}
                    </Flex>
                  </Box>
                );
              }
            })}
            <Separator value="OU" isLast={last_group === el} />
            <Flex justifyContent="flex-end">
              <Button variant="link" opacity={0.2} fontSize="10">
                Ajouter un groupe
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};
