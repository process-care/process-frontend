import React from "react";

import { Container, Button, Flex } from "@chakra-ui/react";
import { operators } from "constants/operators";
import { useAppDispatch } from "redux/hooks";
import { updateCondition } from "redux/slices/formBuilder";
import ICondition from "interfaces/form/condition";

interface Props {
  selectedCondition: ICondition;
}

export const Step_2: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  return (
    <Container w="90%" maxW="unset" d="flex" h="100%" justifyContent="center">
      <Flex flexWrap="wrap" w="100%" justifyContent="center" mt={"200"} h="0">
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
