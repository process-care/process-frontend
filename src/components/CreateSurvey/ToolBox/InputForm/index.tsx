import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { formStore } from "stores/inputs";

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

  // const onSubmit = (selectedInput: SelectedInput) => {
  //   addInput(selectedInput);
  //   onClose();
  // };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={10}>
              <Text fontSize="lg">Créer un champ {selectedInput.type}</Text>
              <hr />

              {renderFormTemplate(selectedInput)}
              <Footer
                onSubmit={() => onSubmit(selectedInput)}
                onCancel={() => onCancel()}
              />
            </Flex>
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
