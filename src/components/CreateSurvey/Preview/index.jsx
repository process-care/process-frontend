import React from "react";
import { Box } from "@chakra-ui/react";
import { formStore } from "stores/inputs";

const Preview: React.FC = () => {
  const formState = formStore((state) => state.formState);

  return (
    <Box
      w="100%"
      d="flex"
      flexDirection="column"
      alignItems="center"
      h="100%"
      overflow="scroll"
      p="10">
      {formState.map(({ id }, i) => (
        <Box bg="white" key={i} m="2" w="50%" p="5">
          {id}
        </Box>
      ))}
    </Box>
  );
};

export default Preview;
