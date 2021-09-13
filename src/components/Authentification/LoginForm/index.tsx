import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Input, Textarea } from "components/Fields";
import { NavLink } from "react-router-dom";

export const LoginForm: React.FC = () => {
  return (
    <Box backgroundColor="white" p="110px 50px" w="480px">
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      <Formik
        validateOnBlur={false}
        initialValues={{}}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Box w="100%" pt="90px" textAlign="left">
                <Flex justifyContent="center" flexDirection="column" w="100%">
                  <Textarea
                    isCollapsed={false}
                    rows="small"
                    label="Identifiant"
                    placeholder="Renseigner votre identifiant"
                    id="firstName"
                    isRequired
                  />
                  <Input
                    isCollapsed={false}
                    label="Mot de passe"
                    placeholder="Renseigner votre mot de passe"
                    name="password"
                    type="password"
                    isRequired
                  />
                  <Box>
                    <Button variant="link">Mot de passe oublié ? </Button>
                  </Box>
                  <Flex justifyContent="space-between" pt="90px">
                    <NavLink to="/inscription">
                      <Button variant="rounded">Créer un compte</Button>
                    </NavLink>

                    <Button
                      disabled={!isValid || isSubmitting}
                      variant="roundedBlue"
                    >
                      Connexion
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
