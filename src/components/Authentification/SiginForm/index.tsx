import React from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Textarea, Input } from "components/Fields";
import { CustomRadioBox } from "components/Fields/Radiobox";

import { NavLink } from "react-router-dom";
import { SuccessPage } from "../SucessPage";

export const SigninForm: React.FC = () => {
  const [isSuccessPage, seIsSuccessPage] = React.useState<boolean>(false);

  if (isSuccessPage) {
    return <SuccessPage/>;
  }
  return (
    <Formik
      validateOnBlur={false}
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
        seIsSuccessPage(true);
      }}
    >
      {({ isValid, isSubmitting }) => {
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
                  isRequired
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Nom"
                  placeholder="Renseigner votre nom"
                  id="name"
                  isRequired
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
                  isRequired
                />
                <Input
                  isCollapsed={false}
                  label="Mot de passe"
                  placeholder="Renseigner votre nouveau mot de passe"
                  name="password"
                  type="password"
                  isRequired
                />

                <Input
                  isCollapsed={false}
                  label="Confirmation du nouveau mot de passe"
                  placeholder="Confimer votre nouveau mot de passe"
                  name="newPassword"
                  type="password"
                  isRequired
                />
                <CustomRadioBox
                  radios={[
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
                  disabled={isSubmitting || !isValid}
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
