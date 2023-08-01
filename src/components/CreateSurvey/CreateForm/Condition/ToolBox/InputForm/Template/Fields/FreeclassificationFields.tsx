import { Box } from "@chakra-ui/react";

import { NumberInput, Radiobox } from "@/components/Fields";
import { CommonFields } from "../index";
import TitleDivider from "@/components/TitleDivider";

export default function FreeclassificationFields(): JSX.Element {
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
          p="10px 0"
          label="Nombre de charactères de la réponse"
          radios={[
            { value: "small", label: "50" },
            { value: "medium", label: "500" },
            { value: "large", label: "5000" },
          ]}
          id="rows"
          helpText="Limite du nombre de caractères"
        />
        <NumberInput
          style={{ width: "45%" }}
          name="freeclassification_responses_count"
          label="Proximité avec les réponses des autres participants"
          placeholder="5"
          helpText="Nombre de propositions affichées"
        />
      </Box>
    </>
  );
};
