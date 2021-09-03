import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export const Loader: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner size="xs" />
    </Center>
  );
};
