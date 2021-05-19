import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useAppDispatch } from "redux/hooks";

import { Footer } from "./Template/Footer";
import { renderFormTemplate } from "./utils";
import { fields } from "./Template/logic/initialValues";
import { updateInput } from "redux/slices/formBuilder";
import Inputs from "interfaces/inputs";

interface Props {
  selectedInput: Inputs;
  onClose: () => void;
}

const InputForm: React.FC<Props> = ({ selectedInput, onClose }) => {
  // const addInput = formStore((state) => state.addInput);
  const dispatch = useAppDispatch();
  const onCancel = () => {
    onClose();
  };
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target !== null) {
      dispatch(
        updateInput({
          id: selectedInput.id,
          data: { [target.id]: target.value },
        })
      );
    }
  };

  const { type } = selectedInput;

  return (
    <Formik
      initialValues={fields[type]}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        // dispatch(addInput(selectedInput));
        console.log("FORM DATA : ", data);
        onClose();
      }}>
      {({ isValid, isSubmitting }) => {
        return (
          <Form onChange={(event) => onChange(event)}>
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
