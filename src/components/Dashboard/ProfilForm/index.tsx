import React from "react";
import { Formik, Form } from "formik";

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/application";

import { Textarea, Input } from "components/Fields";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { useHistory } from "react-router-dom";
import { useAuth } from "components/Authentification/hooks";
import { Loader } from "components/Spinner";
import { changePassword } from "api/actions/password";
import { UserQuery, useUpdateUserMutation, useUserQuery } from "./user.gql.generated";
import { Enum_Question_Rows } from "api/graphql/types.generated";
import { client } from "api/gql-client";

// ---- STATICS

const t = {
  title: "Mon profil",
  changePassword: "Changer de mot de passe",
};

// ---- TYPES

export interface UserProfil {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  job: string;
  institution: string;
}

// ---- COMPONENT

export const ProfilForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cookies } = useAuth();

  const { data: userResult, isLoading } = useUserQuery(client, {
    id: cookies.user.id,
  });
  const { mutateAsync: updateMe } = useUpdateUserMutation(client);

  const history = useHistory();

  const onCancel = () => {
    history.push("/dashboard");
    dispatch(actions.toogleDrawer());
  };

  if (isLoading) {
    return <Loader />;
  }

  // Shortcut to display on the page
  const attributes = userResult?.usersPermissionsUser?.data?.attributes;

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={formatInitialValues(userResult)}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        if (data.currentPassword !== "" && data.confirmNewPassword === data.newPassword && data.newPassword !== "") {
          changePassword(data.currentPassword, data.newPassword, data.confirmNewPassword);
        }
        updateMe({
          id: cookies.user.id,
          data: formatValues(data),
        });
        setSubmitting(false);
        dispatch(actions.toogleDrawer());
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Form>
            <Box textAlign="center" h="100vh" d="flex" flexDir="column" pt="10px">
              <Flex alignItems="center" justifyContent="flex-start" ml="20px">
                <Avatar
                  _hover={{ cursor: "pointer" }}
                  ml="20px"
                  w="30px"
                  h="30px"
                  color="white"
                  fontSize="45px"
                  background="linear-gradient(rgba(194, 165, 249, 1),
rgba(0, 132, 255, 1))"
                />
                <Flex flexDir="column" alignItems="flex-start" ml="10px">
                  <Text variant="smallTitle" fontWeight="bold">
                    {attributes?.firstName} {attributes?.lastName}
                  </Text>
                  <Text variant="current" color="brand.gray.200">
                    {attributes?.job}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                alignItems="center"
                justifyContent="center"
                fontSize="30"
                flexDirection="column"
                px={10}
                w="100%"
                pt="10px"
              >
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="Prénom"
                  placeholder="Renseigner votre prénom"
                  id="firstName"
                  isRequired
                />
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="Nom"
                  placeholder="Renseigner votre nom"
                  id="lastName"
                  isRequired
                />
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="Email de contact"
                  placeholder="Renseigner votre email"
                  id="email"
                  isRequired
                />
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="Profession"
                  placeholder="Renseigner votre profession"
                  id="job"
                />
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="Institution"
                  placeholder="Renseigner votre institution"
                  id="institution"
                />
                <Text variant="smallTitle" py="20px">
                  {t.changePassword}
                </Text>

                <Input
                  isCollapsed={false}
                  label="Mot de passe actuel"
                  placeholder="Renseigner votre mot de passe actuel"
                  name="currentPassword"
                  type="password"
                />
                <Input
                  isCollapsed={false}
                  label="Nouveau mot de passe"
                  placeholder="Renseigner votre nouveau mot de passe"
                  name="newPassword"
                  type="password"
                />

                <Input
                  isCollapsed={false}
                  label="Confirmation du nouveau mot de passe"
                  placeholder="Confimer votre nouveau mot de passe"
                  name="confirmNewPassword"
                  type="password"
                />
                <Footer
                  w="100%"
                  hideDelete
                  onSubmit={() => console.log(values)}
                  disabled={!isValid || isSubmitting}
                  onCancel={() => onCancel()}
                  onDelete={() => {
                    dispatch(actions.toogleDrawer());
                  }}
                />
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

// ---- HELPERS

// Sanitize the form values to match the `updateMe` mutation
function formatValues(data: UserProfil | Record<string, any>) {
  return {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    job: data?.job,
    institution: data?.institution,
  };
}

// Transform auery results into form initial values
function formatInitialValues(results: UserQuery | undefined) {
  const attributes = results?.usersPermissionsUser?.data?.attributes;

  if (!attributes) {
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  return {
    firstName: attributes.firstName,
    lastName: attributes.lastName,
    email: attributes.email,
    job: attributes.job,
    institution: attributes.institution,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}
