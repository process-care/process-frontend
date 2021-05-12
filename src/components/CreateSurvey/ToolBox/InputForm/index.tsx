import React from "react";
import { formStore } from "stores/inputs";

import { Flex, FormControl, Text } from "@chakra-ui/react";
import { Footer } from "./Template/Footer";
import { renderFormTemplate } from "./utils";

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
    addInput(selectedInput);
    onClose();
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      fontSize="30"
      flexDirection="column">
      <Text fontSize="lg">Créer un champ {selectedInput.type}</Text>
      <hr />
      <FormControl id="email" p="5">
        {renderFormTemplate(selectedInput)}
        <Footer
          onSubmit={() => onSubmit(selectedInput)}
          onCancel={() => onCancel()}
        />
      </FormControl>
    </Flex>
  );
};

export default InputForm;
