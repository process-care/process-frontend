import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  isLast: boolean;
  value: "ET" | "OU";
}

export const Separator: React.FC<Props> = ({ isLast, value }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" mt={2}>
      <Box borderTop="1px solid" w="45%" borderColor="brand.line" />
      <Text
        opacity={isLast ? 0.2 : 1}
        fontSize="10"
        textAlign="center"
        border="1px solid"
        w="fit-content"
        borderRadius="4"
        color={value === "OU" ? "white" : "black"}
        backgroundColor={value === "OU" ? "black" : "transparent"}
        borderColor="black"
        p={value === "OU" ? "5px" : "2px"}
      >
        {value}
      </Text>
      <Box borderTop="1px solid" w="45%" borderColor="brand.line" />
    </Flex>
  );
};
