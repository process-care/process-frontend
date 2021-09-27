import React from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Textarea, Input, Checkbox } from "components/Fields";

import { NavLink } from "react-router-dom";
import { SuccessPage } from "../SucessPage";
import { useSignin } from "call/actions/auth";
import { SigninSchema } from "./validationSchema";

export const SigninForm: React.FC = () => {
  const [isSuccessPage, seIsSuccessPage] = React.useState<boolean>(false);
  const { mutateAsync: signin, error } = useSignin();
  const formatData = (data: any) => {
    return {
      email: data.email,
      password: data.password,
      username: data.name,
    };
  };

  if (isSuccessPage) {
    return <SuccessPage />;
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
        signin(formatData(data)).then((res: any) => {
          if (res.register.jwt) {
            seIsSuccessPage(true);
            localStorage.setItem("process__user", JSON.stringify(res.register));
          }
          setSubmitting(false);
        });
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
              w="40%"
            >
              <Text>Création de compte</Text>
              {error && <p>{error.name}</p>}
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
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Nom"
                  placeholder="Renseigner votre nom"
                  id="name"
                  isRequired="true"
                />

                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Profession"
                  placeholder="Renseigner votre profession"
                  id="job"
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Institution"
                  placeholder="Renseigner votre institution"
                  id="institution"
                />
                <br />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Email de contact"
                  placeholder="Renseigner votre email"
                  id="email"
                  isRequired="true"
                />
                <Input
                  isCollapsed={false}
                  label="Mot de passe"
                  placeholder="Renseigner votre nouveau mot de passe"
                  name="password"
                  type="password"
                  isRequired="true"
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
