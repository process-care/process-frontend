import React from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Textarea, Input, Checkbox } from "components/Fields";
import { NavLink } from "react-router-dom";
import { SuccessPage } from "../SucessPage";
import { SigninSchema } from "./validationSchema";
import { actions } from "redux/slices/global";
import { useDispatch } from "react-redux";
import { Errors, renderAuthMessage } from "../Errors";
import { useAppSelector } from "redux/hooks";

export const SigninForm: React.FC = () => {
  const isSuccess = useAppSelector((state) => state.global.auth.data?.user?.id);
  const errors = useAppSelector((state) => state.global.auth.errors);

  const dispatch = useDispatch();
  const formatData = (data: any) => {
    return {
      email: data.email,
      password: data.password,
      username: data.name,
      job: data.job,
      institution: data.institution,
    };
  };

  if (isSuccess) {
    return <SuccessPage />;
  }

  function handleSubmit(data: any) {
    dispatch(actions.signin(formatData(data)));
  }

  return (
    <Formik
      validateOnMount={false}
      validateOnChange={false}
      validateOnBlur
      validationSchema={SigninSchema}
      initialValues={{
        name: "",
        firstName: "",
        job: "",
        email: "",
        institution: "",
      }}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        handleSubmit(data);
        setSubmitting(false);
      }}
    >
      {({ isValid, isSubmitting, dirty }) => {
        return (
          <Form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              p="100px 10%"
              backgroundColor="white"
              d="flex"
              flexDir="column"
              w="60%"
            >
              <Text>Création de compte</Text>
              <Flex
                alignItems="center"
                justifyContent="center"
                fontSize="30"
                flexDirection="column"
                w="100%"
              >
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Prénom"
                  placeholder="Renseigner votre prénom"
                  id="firstName"
                  isRequired="true"
                  autoComplete="given-name"
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Nom"
                  placeholder="Renseigner votre nom"
                  id="name"
                  isRequired="true"
                  autoComplete="family-name"
                />

                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Profession"
                  placeholder="Renseigner votre profession"
                  id="job"
                  autoComplete="organization-title"
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Institution"
                  placeholder="Renseigner votre institution"
                  id="institution"
                  autoComplete="organization"
                />
                <br />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Email de contact"
                  placeholder="Renseigner votre email"
                  id="email"
                  isRequired="true"
                  autoComplete="email"
                />
                <Input
                  isCollapsed={false}
                  label="Mot de passe"
                  placeholder="Renseigner votre nouveau mot de passe"
                  name="password"
                  type="password"
                  isRequired="true"
                  autoComplete="new-password"
                />

                <Input
                  isCollapsed={false}
                  label="Confirmation du nouveau mot de passe"
                  placeholder="Confimer votre nouveau mot de passe"
                  name="confirmPassword"
                  type="password"
                  isRequired="true"
                />
                <Checkbox
                  isRequired="true"
                  checkbox={[
                    {
                      label:
                        "En créant votre compte vous acceptez les conditions générales d’utilisation de la plateforme",
                      value: "accept",
                    },
                  ]}
                  isCollapsed={false}
                  id="cgv"
                  label=""
                />
              </Flex>
              <Errors message={renderAuthMessage(errors)} />
              <Flex justifyContent="space-between" pt="60px">
                <NavLink to="/connexion">
                  <Button variant="link">Annuler</Button>
                </NavLink>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  variant="roundedBlue"
                >
                  Valider
                </Button>
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
