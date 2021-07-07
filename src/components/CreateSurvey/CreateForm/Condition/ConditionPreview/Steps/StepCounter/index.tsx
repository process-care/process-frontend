import { Box, Flex, Text } from "@chakra-ui/react";
import ICondition from "interfaces/form/condition";
import React from "react";
import { Circle } from "@chakra-ui/react";

import { t } from "static/condition";
import { useUpdateCondition } from "api/actions/condition";

const steps = [
  { title: t.steps[0] },
  { title: t.steps[1] },
  { title: t.steps[2] },
];

interface Props {
  currentCondition: ICondition | undefined;
  isDisabled: boolean;
}

export const StepCounter: React.FC<Props> = ({
  currentCondition,
  isDisabled,
}) => {
  const { mutateAsync: updateCondition } = useUpdateCondition(
    currentCondition?.id
  );
  return (
    <Flex justifyContent="center" mt={4} w="50%" mx="auto">
      {steps.map((_, i) => {
        const isDone =
          currentCondition?.step !== undefined &&
          currentCondition?.step >= i + 1;
        return (
          <Flex w="40%" key={i}>
            <Flex
              onClick={() =>
                !isDisabled &&
                updateCondition({
                  id: currentCondition?.id,
                  data: {
                    step: i + 1,
                  },
                })
              }
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Circle
                _hover={{
                  backgroundColor: "brand.blue",
                  color: "white",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                size="24px"
                borderColor={isDone ? "brand.blue" : "black"}
                color={isDone ? "brand.blue" : "black"}
                border="1px solid"
              >
                <Text variant="xxs">{`0${i + 1}`}</Text>
              </Circle>
              <Text variant="xxs" maxW="100px">
                {_.title}
              </Text>
            </Flex>
            {i < steps.length - 1 && (
              <Box
                pos="relative"
                top="12px"
                h="0px"
                background={isDone ? "brand.blue" : "black"}
                borderTop="0.5px solid transparent"
                w="100%"
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};
