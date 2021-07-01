import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface Props {
  error:
    | {
        message: string;
        name: string;
      }
    | any;
}

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <Center display="flex" flexDirection="column">
      <WarningIcon w={8} h={8} mb={10} color="red.500" />

      <Text color="red.500">Une erreur est survenue ! </Text>
      <Text color="red.500">{error?.name}</Text>
      <Text color="red.500">{error?.message}</Text>
    </Center>
  );
};
