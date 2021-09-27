import React from "react";
import { Formik, Form } from "formik";

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch } from "redux/hooks";
import { toogleDrawer } from "redux/slices/application";

import { Textarea, Input } from "components/Fields";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { useHistory } from "react-router-dom";
import { useAuth } from "components/Authentification/hooks";
import { useGetMe, User, useUpdateMe } from "call/actions/auth";
import { Loader } from "components/Spinner";
// import { useGetMe } from "call/actions/auth";

const t = {
  title: "Mon profil",
  changePassword: "Changer de mot de passe",
};

export const ProfilForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { data, isLoading } = useGetMe(user.id);
  const { mutateAsync: updateMe } = useUpdateMe();

  const history = useHistory();

  const onCancel = () => {
    history.push("/dashboard");
    dispatch(toogleDrawer());
  };

  if (isLoading) {
    return <Loader />;
  }
  const formatValues = (data: User | Record<string, any>) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      job: data.job,
      institution: data.institution,
    };
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={data?.users ? data.users[0] : {}}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        updateMe({
          id: user.id,
          data: formatValues(data),
        });
        setSubmitting(false);
        dispatch(toogleDrawer());
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Form>
            <Box
              textAlign="center"
              h="100vh"
              d="flex"
              flexDir="column"
              pt="50px"
            >
              <Flex alignItems="center" justifyContent="center">
                <Avatar
                  _hover={{ cursor: "pointer" }}
                  ml="20px"
                  name={
                    data?.users[0].firstName + " " + data?.users[0].lastName
                  }
                  w="104px"
                  h="104px"
                  color="white"
                  fontSize="45px"
                  background="linear-gradient(rgba(194, 165, 249, 1),
rgba(0, 132, 255, 1))"
                />
                <Flex flexDir="column" alignItems="flex-start" ml="40px">
                  <Text variant="smallTitle" fontWeight="bold">
                    {data?.users[0].firstName} {data?.users[0].lastName}
                  </Text>
                  <Text variant="current" color="brand.gray.200">
                    {data?.users[0].job}
                  </Text>
                </Flex>
              </Flex>

              <Text variant="smallTitle" py="30px">
                {t.title}
              </Text>
              <Flex
                alignItems="center"
                justifyContent="center"
                fontSize="30"
                flexDirection="column"
                px={10}
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
                  id="lastName"
                  isRequired
                />
                <Textarea
                  isCollapsed={false}
                  rows="small"
                  label="Email de contact"
                  placeholder="Renseigner votre email"
                  id="email"
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
                <Text variant="smallTitle" py="20px">
                  {t.changePassword}
                </Text>

                <Input
                  isCollapsed={false}
                  label="Ancien mot de passe"
                  placeholder="Renseigner votre ancien mot de passe"
                  name="oldPassword"
                  type="password"
                />
                <Input
                  isCollapsed={false}
                  label="Nouveau mot de passe"
                  placeholder="Renseigner votre nouveau mot de passe"
                  name="password"
                  type="password"
                />

                <Input
                  isCollapsed={false}
                  label="Confirmation du nouveau mot de passe"
                  placeholder="Confimer votre nouveau mot de passe"
                  name="newPassword"
                  type="password"
                />

                <Footer
                  hideDelete
                  onSubmit={() => console.log(values)}
                  disabled={!isValid || isSubmitting}
                  onCancel={() => onCancel()}
                  onDelete={() => {
                    dispatch(toogleDrawer());
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
