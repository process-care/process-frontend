import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Textarea } from "components/Fields";
import { forgotPassword } from "api/actions/password";
import { forgotPasswordSchema } from "./validationSchema";
import { NavLink } from "react-router-dom";
import { Enum_Question_Rows } from "api/graphql/types.generated";

export const ForgotPasswordForm: React.FC = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [errors, setError] = useState<any>([]);

  if (isSuccess) {
    return <Box>✅ Un mail vient d'être envoyer à votre adresse email !</Box>;
  }

  return (
    <Box backgroundColor="white" p="110px 50px" w="480px">
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      <Formik
        validateOnChange
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          forgotPassword(data.email)
            .then((res: any) => {
              if (res.status === 200) {
                setSuccess(true);
              }
            })
            .catch((err: any) => {
              setError(err.response.data.message);
            });
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
                    rows={Enum_Question_Rows.Small}
                    label="Renseigner votre email"
                    placeholder="Email"
                    id="email"
                    isRequired
                  />

                  {errors.length > 0 &&
                    errors[0].messages.map((err: any) => {
                      return (
                        <Text color="red" fontSize="12px" mt="10px">
                          {err.message}
                        </Text>
                      );
                    })}

                  <Button
                    mt="40px"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    variant="roundedBlue"
                  >
                    Reinitialiser mon mot de passe
                  </Button>
                  <Box textAlign="center">
                    <NavLink to="/connexion">
                      <Button
                        mt="40px"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        variant="link"
                      >
                        Annuler
                      </Button>
                    </NavLink>
                  </Box>
                </Flex>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
