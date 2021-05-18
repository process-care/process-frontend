import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { formStore } from "stores/inputs";

import { Footer } from "./Template/Footer";
import { renderFormTemplate } from "./utils";
import { fields } from "./Template/logic/initialValues";

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

  const { type } = selectedInput;

  return (
    <Formik
      initialValues={fields[type]}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        addInput(selectedInput);
        console.log("FORM DATA : ", data);
        onClose();
      }}>
      {({ isValid, isSubmitting }) => {
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
                disabled={!isValid || isSubmitting}
                onCancel={() => onCancel()}
              />
            </Flex>

            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
