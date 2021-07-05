import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export const Loader: React.FC = () => {
  return (
    <Center>
      <Spinner size="xs" />
    </Center>
  );
};
