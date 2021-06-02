import React from "react";

import { Container, Text, Box, Flex } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  selectInputsInCurrentPage,
  updateCondition,
} from "redux/slices/formBuilder";
import IInput from "interfaces/form/input";
import ICondition from "interfaces/form/condition";

interface Props {
  currentCondition: ICondition;
}

export const Step_1: React.FC<Props> = ({ currentCondition }) => {
  const { selected_page, selected_condition } = useAppSelector(
    (state) => state.formBuilder
  );
  const inputs = useAppSelector(selectInputsInCurrentPage);
  const dispatch = useAppDispatch();

  const renderCard = (input: IInput) => {
    const isSelected = input.id === currentCondition?.selected_question?.id;
    return (
      <Box
        onClick={() =>
          dispatch(
            updateCondition({
              id: selected_condition?.id,
              data: {
                selected_question: input,
              },
            })
          )
        }
        _hover={{
          cursor: "pointer",
          borderColor: "brand.blue",
        }}
        key={input.id}
        border="1px solid"
        w="100%"
        borderRadius="5px"
        padding="5"
        textAlign="left"
        mt={10}
        backgroundColor={isSelected ? "brand.blue" : "white"}
        color={isSelected ? "white" : "black"}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{input.label}</Text>
          <Flex alignItems="center">
            <Text fontSize="12" color="brand.gray.200">
              {input.internal_title}
            </Text>
            <Text fontSize="12" color="black" ml={4}>
              {input.input_type}
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Container w="90%" maxW="unset">
      <Text fontSize="14px" mt={5} mb={10} textTransform="uppercase">
        {selected_page.name} - Condition vue
      </Text>

      {inputs.map((input) => renderCard(input))}
    </Container>
  );
};
