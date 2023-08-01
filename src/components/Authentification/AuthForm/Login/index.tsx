'use client'

import { useDispatch } from "react-redux";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/Fields";
import { actions } from "@/redux/slices/scientistData";
import { useAppSelector } from "@/redux/hooks";
import { LoginSchema } from "@/components/Authentification/SiginForm/validationSchema";
import Errors, { renderAuthMessage } from "@/components/Authentification/Errors";

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();
  const isConnected = useAppSelector((state) => state.scientistData.auth.isConnected);
  const errors = useAppSelector((state) => state.scientistData.auth.errors);

  function handleSubmit({ identifier, password }: any) {
    dispatch(actions.login({ identifier, password }));
  }

  if (isConnected) {
    router.push("/dashboard");
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
                <Link href="/mot-de-passe-oublie" style={{ width: "fit-content" }}>
                  <Button variant="link">Mot de passe oublié ? </Button>
                </Link>
                <Errors message={renderAuthMessage(errors)} />
                <Button mt="60px" type="submit" disabled={!isValid || isSubmitting || !dirty} variant="roundedBlue">
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
