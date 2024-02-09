import { Input } from "@/components/Fields/index.ts"
import { Box } from "@chakra-ui/react";

interface Props {
  noPlacehoder?: boolean;
}

export default function CommonFields({ noPlacehoder = false }: Props): JSX.Element {
  return (
    <Box>
      {!noPlacehoder && (
        <Input
          isCollapsed={false}
          name="placeholder"
          type="text"
          label="Placeholder"
          placeholder="Le placeholder s'affiche ici."
          isAccordion
        />
      )}

      <Input
        isCollapsed={false}
        label="Champ d'aide"
        placeholder="Texte d'aide de votre question. Il s'affichera sous le champ."
        name="help_text"
        isAccordion
      />
    </Box>
  );
};
