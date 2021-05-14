import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { Formik } from "formik";

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

  const onSubmit = (selectedInput: SelectedInput) => {
    addInput(selectedInput);
    onClose();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
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
        </form>
      )}
    </Formik>
  );
};

export default InputForm;
