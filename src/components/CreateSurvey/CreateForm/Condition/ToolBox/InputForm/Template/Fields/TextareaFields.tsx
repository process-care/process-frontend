import { Box } from "@chakra-ui/react";

import { Radiobox } from "@/components/Fields/index.ts"
import { CommonFields } from "../index.ts"
import TitleDivider from "@/components/TitleDivider/index.tsx"

export default function TextareaFields(): JSX.Element {
  return (
    <>
      <TitleDivider title="Contenu" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        <CommonFields />

        <Radiobox
          id="rows"
          label="Taille de la zone de réponse"
          p="10px 0"
          radios={[
            { value: "small", label: "Petite" },
            { value: "medium", label: "Moyenne" },
            { value: "large", label: "Grande" },
          ]}
          isRequired={true}
        />
      </Box>
    </>
  );
};
