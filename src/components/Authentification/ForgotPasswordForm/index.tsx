import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Textarea } from "components/Fields";
import { useHistory } from "react-router-dom";

export const ForgotPasswordForm: React.FC = () => {
  const history = useHistory();

  const initialValues =
    process.env.NODE_ENV === "development"
      ? { identifier: "dev@dev.com", password: "testtest" }
      : {
          identifier: "process-bot",
          password: "bot-mangly-WOLVES-canopee",
        };

  return (
    <Box backgroundColor="white" p="110px 50px" w="480px">
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);

          history.push(`/dashboard`);
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Box w="100%" pt="90px" textAlign="left">
                <Flex justifyContent="center" flexDirection="column" w="100%">
                  <Text variant="current" mb="20px">
                    Merci de renseigner votre adresse email, vous recevrez un
                    lien vous permettant de réinitialiser votre mot de passe.
                  </Text>
                  <Textarea
                    isCollapsed={false}
                    rows="small"
                    label="Renseigner votre email"
                    placeholder="Email"
                    id="identifier"
                    isRequired
                  />

                  <Button
                    mt="40px"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    variant="roundedBlue"
                  >
                    Reinitialiser mon mot de passe
                  </Button>
                </Flex>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
