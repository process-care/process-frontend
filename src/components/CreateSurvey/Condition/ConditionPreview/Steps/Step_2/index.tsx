import React from "react";

import { Container, Button, Flex } from "@chakra-ui/react";
import { operators } from "constants/operators";
import { useAppDispatch } from "redux/hooks";
import { updateCondition } from "redux/slices/formBuilder";
import ICondition from "interfaces/form/condition";
// import IOperator from "interfaces/form/operator";

interface Props {
  selectedCondition: ICondition;
}

export const Step_2: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  // const input_type =
  //   selectedCondition?.selected_question?.input_type !== undefined
  //     ? selectedCondition?.selected_question?.input_type
  //     : "text-area";

  // const authorizedOperators = (input_type: string | undefined) => {
  //   const multipleInput: string[] = ["checkbox", "radio", "select"];

  //   if (input_type !== undefined) {
  //     if (multipleInput.includes(input_type)) {
  //       return [
  //         {
  //           id: "different",
  //           name: "Différent de",
  //         },
  //         {
  //           id: "equal",
  //           name: "Egal à",
  //         },
  //       ];
  //     } else return operators;
  //   } else return operators;
  // };
  return (
    <Container w="90%" maxW="unset" d="flex" h="100%" justifyContent="center">
      <Flex flexWrap="wrap" w="100%" justifyContent="center" h="0">
        {operators.map(({ id, name }) => {
          const isSelected = id === selectedCondition.operator?.id;

          return (
            <Button
              onClick={() =>
                dispatch(
                  updateCondition({
                    id: selectedCondition.id,
                    data: { operator: { id, name } },
                  })
                )
              }
              key={id}
              variant="box"
              minW="200px"
              isSelected={isSelected}
              _hover={{ borderColor: "brand.blue", color: "brand.blue" }}>
              {name}
            </Button>
          );
        })}
      </Flex>
    </Container>
  );
};
