'use client'

import { useDispatch } from "react-redux";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link.js"
import { useRouter } from "next/navigation.js"

import { Input } from "@/components/Fields/index.ts"
import { actions } from "@/redux/slices/scientistData.js"
import { useAppSelector } from "@/redux/hooks/index.js"
import { LoginSchema } from "@/components/Authentification/SiginForm/validationSchema.js"
import Errors, { renderAuthMessage } from "@/components/Authentification/Errors/index.tsx"

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
                  placeholder="Votre e-mail"
                  name="identifier"
                  isRequired="true"
                  autoComplete="email"
                />
                <Input
                  isCollapsed={false}
                  label="Mot de passe"
                  placeholder="Votre mot de passe"
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
