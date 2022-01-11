import React from "react";

import { Radiobox } from "components/Fields";
import { CommonFields } from "../index";
import { TitleDivider } from "components/TitleDivider";
import { Box } from "@chakra-ui/react";

export const TextareaFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <TitleDivider title="Champs particuliers" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        <Radiobox
          p="10px 0"
          label="Taille de la zone de réponse"
          radios={[
            { value: "small", label: "Petite" },
            { value: "medium", label: "Moyenne" },
            { value: "large", label: "Grande" },
          ]}
          id="rows"
        />
      </Box>
    </>
  );
};
