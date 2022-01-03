import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Input, Textarea } from "components/Fields";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/scientistData";
import { useAppSelector } from "redux/hooks";
import { Errors, renderAuthMessage } from "../Errors";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isConnected = useAppSelector(
    (state) => state.scientistData.auth.isConnected
  );
  const errors = useAppSelector((state) => state.scientistData.auth.errors);

  // For dev facilities
  const initialValues =
    process.env.NODE_ENV === "development"
      ? { identifier: "dev@dev.com", password: "testtest" }
      : {
          identifier: "process-bot",
          password: "bot-mangly-WOLVES-canopee",
        };

  function handleSubmit({ identifier, password }: any) {
    dispatch(actions.login({ identifier, password }));
  }

  if (isConnected) {
    history.push("/dashboard");
  }

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
          handleSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Box w="100%" pt="90px" textAlign="left">
                <Flex justifyContent="center" flexDirection="column" w="100%">
                  {/* {errors && <p>{error.name}</p>} */}
                  <Textarea
                    isCollapsed={false}
                    rows="small"
                    label="Identifiant"
                    placeholder="Renseigner votre identifiant"
                    id="identifier"
                    isRequired
                    autoComplete="email"
                  />
                  <Input
                    isCollapsed={false}
                    label="Mot de passe"
                    placeholder="Renseigner votre mot de passe"
                    name="password"
                    type="password"
                    isRequired
                  />
                  <NavLink to="/mot-de-passe-oublie">
                    <Button variant="link">Mot de passe oublié ? </Button>
                  </NavLink>
                  <Errors message={renderAuthMessage(errors)} />
                  <Flex justifyContent="space-between" pt="90px">
                    <NavLink to="/inscription">
                      <Button variant="rounded">Créer un compte</Button>
                    </NavLink>

                    <Button
                      type="submit"
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
