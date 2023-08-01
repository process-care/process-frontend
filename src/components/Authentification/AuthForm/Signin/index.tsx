'use client'

import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { Input, Checkbox } from "@/components/Fields";
import { SigninSchema } from "@/components/Authentification/SiginForm/validationSchema";
import { actions } from "@/redux/slices/scientistData";
import Errors, { renderAuthMessage } from "@/components/Authentification/Errors";
import { useAppSelector } from "@/redux/hooks";

// ---- TYPES

interface Props {
  cancel: () => void;
}

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

// ---- COMPONENT

export default function SigninForm({ cancel }: Props): JSX.Element {
  const router = useRouter()
  const dispatch = useDispatch();

  const isSuccess = useAppSelector((state) => state.scientistData.auth.data?.user?.id);
  const errors = useAppSelector((state) => state.scientistData.auth.errors);

  const formatData = (data: Data): Auth => {
    return {
      email: data.username,
      password: data.password,
      username: data.username,
    };
  };

  if (isSuccess) {
    router.push("/attente-de-validation");
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
            <Box w="100%" textAlign="left">
              <Flex justifyContent="center" flexDirection="column" w="100%">
                <Input
                  isCollapsed={false}
                  label="E-mail"
                  placeholder="Renseigner votre email"
                  name="username"
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
                  autoComplete="new-password"
                />

                <Input
                  isCollapsed={false}
                  label="Confirmation du mot de passe"
                  placeholder="Confimer votre  mot de passe"
                  name="confirmPassword"
                  type="password"
                  isRequired="true"
                />
                <Checkbox
                  isRequired="true"
                  checkbox={[
                    {
                      label: "J'accepte les conditions générales d'utilisation de la plateforme",
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
                <Button type="submit" disabled={isSubmitting || !isValid || !dirty} variant="roundedBlue">
                  {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                </Button>
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
