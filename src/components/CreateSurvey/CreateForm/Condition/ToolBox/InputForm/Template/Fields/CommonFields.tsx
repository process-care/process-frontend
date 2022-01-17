import React from "react";
import { Input } from "components/Fields";
import { Box } from "@chakra-ui/react";
import { Enum_Question_Rows } from "api/graphql/types.generated";

interface Props {
  noPlacehoder?: boolean;
}

export const CommonFields: React.FC<Props> = ({ noPlacehoder = false }) => {
  return (
    <Box>
      {!noPlacehoder && (
        <Input
          isCollapsed={false}
          name="placeholder"
          type="text"
          label="Placeholder"
          placeholder="le placeholder s'affiche ici."
          isAccordion
        />
      )}

      <Input
        isCollapsed={false}
        label="Champ d'aide"
        placeholder="Renseigner le texte d'aide de votre question.Il s'affichera sous le champ. "
        name="help_text"
        isAccordion
      />
    </Box>
  );
};
