import React from "react";

import { Button, Flex } from "@chakra-ui/react";
import { operators, operatorsForMultiple } from "constants/operators";
import ICondition from "interfaces/form/condition";
import { checkIfMultiple } from "utils/formBuilder/input";
import { useUpdateCondition } from "api/actions/condition";

interface Props {
  currentCondition: Partial<ICondition>;
}

export const Step_2: React.FC<Props> = ({ currentCondition }) => {
  const { mutateAsync: updateCondition } = useUpdateCondition();
  const authorizedOperators = () => {
    if (checkIfMultiple(currentCondition)) {
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
      pt="10%"
    >
      {authorizedOperators().map(({ id, name }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const isSelected = id === currentCondition.operator;

        return (
          <Button
            onClick={() =>
              updateCondition({
                id: currentCondition.id,
                data: { operator: id },
              })
            }
            key={id}
            variant="box"
            minW="200px"
            isSelected={isSelected}
            _hover={{ borderColor: "brand.blue", color: "brand.blue" }}
          >
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
