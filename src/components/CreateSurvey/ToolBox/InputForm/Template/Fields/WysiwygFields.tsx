import { Box } from "@chakra-ui/react";
import { Input, Textarea } from "components/Fields";
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
      <Textarea
        isCollapsed={false}
        p="10px 0"
        rows="medium"
        label="Note"
        placeholder="Renseigner une note relative à votre question"
        id="internal_note"
        helpText="Ce champ n'est pas visible par les utilisateurs."
      />
      <Box w="100%">
        <Wysiwyg id="wysiwyg" />
      </Box>
    </>
  );
};
