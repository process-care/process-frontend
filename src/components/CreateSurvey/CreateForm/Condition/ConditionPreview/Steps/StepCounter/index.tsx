import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Circle } from "@chakra-ui/react";
import { t } from "static/condition";

const steps = [
  { title: t.steps[0] },
  { title: t.steps[1] },
  { title: t.steps[2] },
];

interface Props {
  isDisabled: boolean;
  step: number;
  navigateTo: (step: number) => void;
}

export const StepCounter: React.FC<Props> = ({
  isDisabled,
  step,
  navigateTo,
}) => {
  return (
    <Flex justifyContent="center" mt={4} w="50%" mx="auto">
      {steps.map((_, i) => {
        const isDone = step >= i + 1;
        return (
          <Flex w="40%" key={i}>
            <Flex
              onClick={() => !isDisabled && navigateTo(i + 1)}
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
