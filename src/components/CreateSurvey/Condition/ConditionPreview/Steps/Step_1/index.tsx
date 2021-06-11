import React from "react";

import { Container, Text, Box, Flex } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  selectInputsInCurrentPage,
  updateCondition,
} from "redux/slices/formBuilder";
import IInput from "interfaces/form/input";
import ICondition from "interfaces/form/condition";
import { authorizedInputTypes } from "./utils";

interface Props {
  selectedCondition: ICondition;
}

export const Step_1: React.FC<Props> = ({ selectedCondition }) => {
  const { selected_page } = useAppSelector((state) => state.formBuilder);
  const inputs = useAppSelector(selectInputsInCurrentPage);
  const dispatch = useAppDispatch();
  const authorizedInputs = inputs.filter((i) =>
    authorizedInputTypes.includes(i.input_type)
  );

  const renderCard = (input: IInput) => {
    const isSelected = input.id === selectedCondition.selected_question?.id;
    return (
      <Box
        onClick={() =>
          dispatch(
            updateCondition({
              id: selectedCondition.id,
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
          <Text variant="titleParaLight">{input.label}</Text>
          <Flex alignItems="center">
            <Text variant="xsMedium" color="brand.gray.200">
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
      {authorizedInputs.map((input) => renderCard(input))}
    </Container>
  );
};
