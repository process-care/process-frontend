import React from "react";
import { Box, FormControl, Button } from "@chakra-ui/react";

import { CustomTextarea as Textarea } from "components/CreateSurvey/ToolBox/Inputs/Textarea";

interface Props {
  selectedInput: string;
}

const InputForm: React.FC<Props> = ({ selectedInput }) => {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="30"
      flexDirection="column">
      <h1>Créer un champ {selectedInput}</h1>
      <hr />
      <FormControl id="email" p="10">
        <Textarea
          rows="medium"
          label="Label"
          placeholder="Renseigner le label de votre question"
          name="label"
          id="label"
        />

        <Textarea
          rows="medium"
          label="Champ d'aide"
          placeholder="Renseigner le texte d'aide de votre question"
          name="help"
          id="help"
        />

        <Button mt="20">Ajouter au formulaire</Button>
      </FormControl>
    </Box>
  );
};

export default InputForm;
