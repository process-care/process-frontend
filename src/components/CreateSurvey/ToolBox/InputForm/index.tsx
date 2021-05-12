import React from "react";
import { formStore } from "stores/inputs";

import { Box, FormControl, Button, Text, ButtonGroup } from "@chakra-ui/react";
import { CustomTextarea as Textarea } from "components/CreateSurvey/ToolBox/Inputs/Textarea";
import { CustomSwitch as Switch } from "components/CreateSurvey/ToolBox/Inputs/Switch";
import { CustomRadioBox as Radiobox } from "components/CreateSurvey/ToolBox/Inputs/Radiobox";

interface SelectedInput {
  type: string;
  name: string;
  id: number;
}

interface Props {
  selectedInput: SelectedInput;
  onClose: () => void;
}

const InputForm: React.FC<Props> = ({ selectedInput, onClose }) => {
  const addInput = formStore((state) => state.addInput);

  const onCancel = () => {
    onClose();
  };

  const onSubmit = (selectedInput: SelectedInput) => {
    console.log("on Submit", selectedInput);
    addInput(selectedInput);
    onClose();
  };

  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="30"
      flexDirection="column"
    >
      <Text fontSize="lg">Créer un champ {selectedInput.type}</Text>
      <hr />
      <FormControl id="email" p="5">
        <Textarea
          rows="small"
          label="Label"
          placeholder="Renseigner le label de votre question"
          name="label"
          id="label"
        />

        <Textarea
          p="10px 0"
          rows="medium"
          label="Champ d'aide"
          placeholder="Renseigner le texte d'aide de votre question. "
          name="help"
          id="help"
        />
        <Textarea
          p="10px 0"
          rows="small"
          label="Nom interne de la question"
          placeholder="Renseigner le nom interne de votre question"
          name="internalDescription"
          id="internalDescription"
          helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
        />
        <Radiobox
          p="10px 0"
          label="Taille de la zone de réponse"
          radios={[
            { value: "small", labelValue: "Petite" },
            { value: "medium", labelValue: "Moyenne" },
            { value: "large", labelValue: "Grande" },
          ]}
          id="rows_size"
        />
        <Textarea
          p="10px 0"
          rows="medium"
          label="Note"
          placeholder="Renseigner une note relative à votre question"
          name="internalNote"
          id="internalNote"
          helpText="Ce champ n'est pas visible par les utilisateurs."
        />

        <Switch p="20px 0" label="Réponse obligatoire" id="required" />

        <ButtonGroup
          d="flex"
          justifyContent="space-between"
          w="75%"
          mx="auto"
          pt={2}
          onClick={() => onSubmit(selectedInput)}
        >
          <Button variant="rounded">Valider</Button>
          <Button
            variant="link"
            textDecoration="underline"
            color="black"
            onClick={() => onCancel()}
          >
            Annuler
          </Button>
        </ButtonGroup>
      </FormControl>
    </Box>
  );
};

export default InputForm;
