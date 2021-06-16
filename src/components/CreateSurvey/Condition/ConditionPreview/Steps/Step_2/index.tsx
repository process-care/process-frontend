import React from "react";

import { Button, Flex } from "@chakra-ui/react";
import { operators, operatorsForMultiple } from "constants/operators";
import { useAppDispatch } from "redux/hooks";
import { updateCondition } from "redux/slices/formBuilder";
import ICondition from "interfaces/form/condition";
import { checkIfMultiple } from "utils/formBuilder/input";

interface Props {
  selectedCondition: ICondition;
}

export const Step_2: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();

  const authorizedOperators = () => {
    if (checkIfMultiple(selectedCondition)) {
      return operatorsForMultiple;
    } else return operators;
  };
  return (
    <Flex
      flexWrap="wrap"
      w="90%"
      justifyContent="center"
      h="0"
      alignItems="center"
      pt="10%">
      {authorizedOperators().map(({ id, name }) => {
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
  );
};
