"use client"

import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/Fields";
import { resetPassword } from "@/api/actions/password";
import { newPasswordSchema } from "./validationSchema";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";

import Logo from "@/assets/black_logo.svg";

export default function NewPasswordForm(): JSX.Element {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [errors, setError] = useState<any>([]);

  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const { isTablet } = useMediaQueries();

  if (isSuccess) {
    return (
      <Flex flexDir="column">
        ✅ Votre mot de passe à bien été mis à jour !
        <Link href="/connexion">
          <Button variant="roundedBlue" mt="40px">
            Se connecter
          </Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Box
      backgroundColor="white"
      p={isTablet ? "30px 20px" : "50px"}
      border="1px solid"
      borderColor="brand.line"
      w={isTablet ? "90%" : "480px"}
    >
      <Box display="flex" justifyContent="center" w="150px" m="0 auto">
        <Image src={Logo} alt="Logo" />
      </Box>

      <Formik
        validateOnBlur
        validateOnChange={false}
        validationSchema={newPasswordSchema}
        initialValues={{ password: "", passwordConfirmation: "" }}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          resetPassword(code, data.password, data.passwordConfirmation)
            .then((res: any) => {
              if (res.status === 200) {
                setSuccess(true);
              }
            })
            .catch((err: any) => {
              setError(err.response.data.message);
            });

          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Box w="100%" pt={isTablet ? "20px" : "90px"} textAlign="left">
                <Flex justifyContent="center" flexDirection="column" w="100%">
                  <Text variant="current" mb="20px">
                    Merci de renseigner votre nouveau mot de passe.
                  </Text>
                  <Input
                    isCollapsed={false}
                    type="password"
                    label="Nouveau mot de passe"
                    placeholder="Mot de passe"
                    name="password"
                    isRequired
                  />
                  <Input
                    isCollapsed={false}
                    type="password"
                    label="Confirmation du nouveau mot de passe"
                    placeholder="Mot de passe"
                    name="passwordConfirmation"
                    isRequired
                  />
                  {errors.length > 0 &&
                    errors[0].messages.map((err: any, idx: number) => {
                      return (
                        <Text key={idx} color="red" fontSize="12px" mt="10px">
                          {err.message}
                        </Text>
                      );
                    })}

                  <Button mt="40px" type="submit" disabled={!isValid || isSubmitting} variant="roundedBlue">
                    Réinitialiser mon mot de passe
                  </Button>
                  <Box textAlign="center">
                    <Link href="/connexion">
                      <Button mt="40px" variant="link">
                        Annuler
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
