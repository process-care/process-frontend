import { useCallback } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation.js"

import { client } from "@/api/gql-client.js"
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch } from "@/redux/hooks/index.js"
import { actions } from "@/redux/slices/application/index.js"
import { useAuth } from "@/components/Authentification/hooks/index.js";
import { changePassword } from "@/api/actions/password/index.ts"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { UserQuery, useUpdateUserMutation, useUserQuery } from "./user.gql.generated.ts"
import { Textarea, Input } from "@/components/Fields/index.ts"
import Footer from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer/index.tsx"
import Loader from "@/components/Spinner/index.tsx"

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

export default function ProfilForm(): JSX.Element {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { isLoading: localAuthIsLoading, cookies } = useAuth();

  const { data: userResult, isLoading } = useUserQuery(
    client,
    // @ts-ignore : The query is not enabled if this value is undefined
    { id: cookies?.user?.id},
    { enabled: Boolean(cookies?.user?.id) }
  );
  const { mutateAsync: updateMe } = useUpdateUserMutation(client);

  const onCancel = () => {
    router.push("/dashboard");
    dispatch(actions.toogleDrawer());
  };

  const onSubmit = useCallback((data: any, { setSubmitting, validateForm }: any) => {
    if (!cookies?.user?.id) return

    validateForm(data);
    setSubmitting(true);

    // Change password
    if (data.currentPassword !== "" && data.confirmNewPassword === data.newPassword && data.newPassword !== "") {
      changePassword(data, cookies.jwt)
    }

    // Update User in DB
    updateMe({
      id: cookies.user.id,
      data: formatValues(data),
    });

    // Update UI states
    setSubmitting(false);
    dispatch(actions.toogleDrawer());
  }, [cookies, dispatch, updateMe]);

  // Loader

  if (isLoading || localAuthIsLoading || !cookies?.user?.id) {
    return <Loader />;
  }

  // Flags && shortcuts (for display purposes)

  const attributes = userResult?.usersPermissionsUser?.data?.attributes;

  // JSX

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={formatInitialValues(userResult)}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting, values }) => {
        return (
          <Form className="h-screen flex flex-col text-center">
            <Flex
              className="w-full flex-col items-center justify-center overflow-auto px-10 py-10"
              fontSize="30"
            >
              <Flex className="mt-20 justify-start items-center">
                <Avatar
                  _hover={{ cursor: "pointer" }}
                  w="30px"
                  h="30px"
                  color="white"
                  fontSize="45px"
                  background="linear-gradient(rgba(194, 165, 249, 1),rgba(0, 132, 255, 1))"
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

              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Small}
                label="Prénom"
                placeholder="John"
                id="firstName"
                isRequired
              />

              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Small}
                label="Nom"
                placeholder="Do"
                id="lastName"
                isRequired
              />

              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Small}
                label="Email de contact"
                placeholder="john@do.com"
                id="email"
                isRequired
              />

              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Small}
                label="Profession"
                placeholder="Médecin, chercheur, etc."
                id="job"
              />

              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Small}
                label="Institution"
                placeholder="Hôpital, université, etc."
                id="institution"
              />

              <Text variant="smallTitle" py="20px">
                {t.changePassword}
              </Text>

              <Input
                isCollapsed={false}
                label="Mot de passe actuel"
                placeholder="Mot de passe actuel"
                name="currentPassword"
                type="password"
              />
              <Input
                isCollapsed={false}
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                name="newPassword"
                type="password"
              />

              <Input
                isCollapsed={false}
                label="Confirmation du nouveau mot de passe"
                placeholder="Confirmation du nouveau mot de passe"
                name="confirmNewPassword"
                type="password"
              />
            </Flex>

            <Footer
              hideDelete
              onSubmit={() => console.log(values)}
              disabled={!isValid || isSubmitting}
              onCancel={() => onCancel()}
              onDelete={() => {
                dispatch(actions.toogleDrawer());
              }}
            />
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
