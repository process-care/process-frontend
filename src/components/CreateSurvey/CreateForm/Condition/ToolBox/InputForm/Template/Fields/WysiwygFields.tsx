import { Box } from "@chakra-ui/react";

import Wysiwyg from "@/components/Fields/Wysiwyg/Wysiwyg";

export default function WysiwygFields(): JSX.Element {
  return (
    <>
      <Box w="100%" p="5">
        <Wysiwyg id="wysiwyg" />
      </Box>
    </>
  );
};
