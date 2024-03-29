import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { Form, Formik } from "formik";
import { Input } from "components/Fields";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/scientistData";
import { useAppSelector } from "redux/hooks";
import { LoginSchema } from "components/Authentification/SiginForm/validationSchema";
import { Errors, renderAuthMessage } from "components/Authentification/Errors";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isConnected = useAppSelector(
    (state) => state.scientistData.auth.isConnected
  );
  const errors = useAppSelector((state) => state.scientistData.auth.errors);
  function handleSubmit({ identifier, password }: any) {
    dispatch(actions.login({ identifier, password }));
  }
  if (isConnected) {
    history.push("/dashboard");
  }

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ identifier: "", password: "" }}
      validateOnBlur={false}
      onSubmit={async (data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        handleSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isValid, isSubmitting, dirty }) => {
        return (
          <Form>
            <Box w="100%" textAlign="left">
              <Flex justifyContent="center" flexDirection="column" w="100%">
                {/* {errors && <p>{error.name}</p>} */}
                <Input
                  isCollapsed={false}
                  label="E-mail"
                  placeholder="Renseigner votre email"
                  name="identifier"
                  isRequired="true"
                  autoComplete="email"
                />
                <Input
                  isCollapsed={false}
                  label="Mot de passe"
                  placeholder="Renseigner votre mot de passe"
                  name="password"
                  type="password"
                  isRequired="true"
                />
                <NavLink
                  to="/mot-de-passe-oublie"
                  style={{ width: "fit-content" }}
                >
                  <Button variant="link">Mot de passe oublié ? </Button>
                </NavLink>
                <Errors message={renderAuthMessage(errors)} />
                <Button
                  mt="60px"
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  variant="roundedBlue"
                >
                  Connexion
                </Button>
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
