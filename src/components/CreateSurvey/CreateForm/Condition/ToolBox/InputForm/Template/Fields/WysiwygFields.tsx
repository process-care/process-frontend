import { Box } from "@chakra-ui/react";
import { Input } from "components/Fields";
import { Wysiwyg } from "components/Fields/Wysiwyg";

import React from "react";

export const WysiwygFields: React.FC = () => {
  return (
    <>
      <Input
        isCollapsed={false}
        label="Titre interne de la question"
        placeholder="Renseigner le nom interne de votre question"
        name="internal_title"
        helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
        isRequired
      />

      <Box w="100%">
        <Wysiwyg id="wysiwyg" />
      </Box>
    </>
  );
};
