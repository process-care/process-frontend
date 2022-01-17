import { Box } from "@chakra-ui/react";
import { Wysiwyg } from "components/Fields/Wysiwyg";

import React from "react";

export const WysiwygFields: React.FC = () => {
  return (
    <>
      <Box w="100%" p="5">
        <Wysiwyg id="wysiwyg" />
      </Box>
    </>
  );
};
