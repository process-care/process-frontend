import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Input } from "components/Fields";
import { NavLink, useLocation } from "react-router-dom";
import { resetPassword } from "api/actions/password";
import { newPasswordSchema } from "./validationSchema";

export const NewPasswordForm: React.FC = () => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [errors, setError] = useState<any>([]);
  const query = useQuery();
  const code = query.get("code");

  if (isSuccess) {
    return (
      <Flex flexDir="column">
        ✅ Votre mot de passe à bien été mis à jour !
        <NavLink to="/connexion">
          <Button variant="roundedBlue" mt="40px">
            Se connecter
          </Button>
        </NavLink>
      </Flex>
    );
  }

  return (
    <Box backgroundColor="white" p="110px 50px" w="480px">
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      <Formik
        validateOnBlur
        validateOnChange={false}
        validationSchema={newPasswordSchema}
        initialValues={{ password: "", passwordConfirmation: "" }}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          resetPassword(code, data.password, data.passwordConfirmation)
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
                    Merci de renseigner votre nouveau mot de passe.
                  </Text>
                  <Input
                    isCollapsed={false}
                    type="password"
                    label="Nouveau mot de passe"
                    placeholder="Mot de passe"
                    name="password"
                    isRequired
                  />
                  <Input
                    isCollapsed={false}
                    type="password"
                    label="Confirmation du nouveau mot de passe"
                    placeholder="Mot de passe"
                    name="passwordConfirmation"
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
                    Réinitialiser mon mot de passe
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
