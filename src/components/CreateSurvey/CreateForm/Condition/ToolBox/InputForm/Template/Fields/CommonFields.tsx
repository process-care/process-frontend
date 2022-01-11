import React from "react";
import { Textarea, Input } from "components/Fields";
import { Box } from "@chakra-ui/react";

interface Props {
  noPlacehoder?: boolean;
}

export const CommonFields: React.FC<Props> = ({ noPlacehoder = false }) => {
  return (
    <Box
      w="100%"
      m="0 auto"
      border="1px solid #F7F7F7F7"
      p="5"
      backgroundColor="#fdfdfdf1"
    >
      <Textarea
        isCollapsed={false}
        rows="medium"
        label="Label de la question"
        placeholder="Renseigner le label de votre question"
        id="label"
        isRequired="true"
      />

      {!noPlacehoder && (
        <Input
          isCollapsed={false}
          name="placeholder"
          type="text"
          label="Placeholder de la question"
          placeholder="le placeholder s'affiche ici."
        />
      )}

      <Input
        isCollapsed={false}
        label="Champ d'aide de la question"
        placeholder="Renseigner le texte d'aide de votre question.Il s'affichera sous le champ. "
        name="help_text"
      />

      <Input
        isCollapsed={false}
        label="Titre interne de la question"
        placeholder="Renseigner le nom interne de votre question"
        name="internal_title"
        helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
        isRequired="false"
      />
    </Box>
  );
};
