import React from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Textarea, Input, Checkbox } from "components/Fields";
import { SuccessPage } from "../../SucessPage";
import { SigninSchema } from "../../SiginForm/validationSchema";
import { actions } from "redux/slices/scientistData";
import { useDispatch } from "react-redux";
import { Errors, renderAuthMessage } from "../../Errors";
import { useAppSelector } from "redux/hooks";
import { Enum_Question_Rows } from "api/graphql/types.generated";

interface Props {
  cancel: () => void;
}

export const SigninForm: React.FC<Props> = ({ cancel }) => {
  const isSuccess = useAppSelector(
    (state) => state.scientistData.auth.data?.user?.id
  );
  const errors = useAppSelector((state) => state.scientistData.auth.errors);

  const dispatch = useDispatch();

  type Data = {
    username: string;
    password: string;
    confirmPassword: string;
  };

  type Auth = {
    email: string;
    password: string;
    username: string;
  };

  const formatData = (data: Data): Auth => {
    return {
      email: data.username,
      password: data.password,
      username: data.username,
    };
  };

  if (isSuccess) {
    return <SuccessPage />;
  }

  function handleSubmit(data: Data) {
    dispatch(actions.signin(formatData(data)));
  }

  return (
    <Formik
      validateOnMount={false}
      validateOnChange={false}
      validateOnBlur
      validationSchema={SigninSchema}
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
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
          <Form>
            <Box w="100%" pt="90px" textAlign="left">
              <Flex justifyContent="center" flexDirection="column" w="100%">
                <Textarea
                  isCollapsed={false}
                  rows={Enum_Question_Rows.Small}
                  label="E-mail"
                  placeholder="Renseigner votre email"
                  id="username"
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
                <Button variant="link" onClick={() => cancel()}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  variant="roundedBlue"
                >
                  Créer mon compte
                </Button>
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
