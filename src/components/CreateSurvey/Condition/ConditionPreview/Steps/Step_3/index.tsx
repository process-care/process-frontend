import React from "react";
import { Formik, Form } from "formik";

import { Box, Container } from "@chakra-ui/react";
import { Input } from "components/Fields";
import { updateCondition } from "redux/slices/formBuilder";
import { useAppDispatch } from "redux/hooks";
import ICondition from "interfaces/form/condition";

interface Props {
  selectedCondition: ICondition;
}

export const Step_3: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();

  return (
    <Container w="90%" maxW="unset">
      <Formik
        validateOnBlur={false}
        initialValues={{ target_value: selectedCondition.target_value }}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}>
        {() => {
          const onChange = (event: React.FormEvent<HTMLFormElement>) => {
            const target = event.target as HTMLFormElement;
            if (target !== null) {
              dispatch(
                updateCondition({
                  id: selectedCondition.id,
                  data: {
                    target_value: target.value,
                  },
                })
              );
            }
          };
          return (
            <Form onChange={(event) => onChange(event)}>
              <Box d="flex" w="50%" mx="auto" alignItems="center" pt="100">
                <Input
                  name="target_value"
                  type="number"
                  label="Indiquer la valeur numérique"
                  placeholder="Ex 5"
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
