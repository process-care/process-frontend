import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/Fields";
import { forgotPassword } from "@/api/actions/password";
import { forgotPasswordSchema } from "./validationSchema";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";

import Logo from "@/assets/black_logo.svg";

export default function ForgotPasswordForm(): JSX.Element {
  const [isSuccess, setSuccess] = useState(false);
  const [errors, setError] = useState<any>([]);
  const { isTablet } = useMediaQueries();

  if (isSuccess) {
    return (
      <Box
        backgroundColor="white"
        p={isTablet ? "30px 20px" : "50px"}
        border="1px solid"
        borderColor="brand.line"
        w={isTablet ? "90%" : "480px"}
        display="flex"
        flexDirection="column"
      >
        ✅ <br /> Un mail vient d&apos;être envoyer à votre adresse email !
        <Link href="/connexion">
          <Button mt="40px" variant="roundedBlue">
            Revenir à la page de connexion
          </Button>
        </Link>
      </Box>
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
        validateOnChange
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          forgotPassword(data.email)
            .then((res: any) => {
              if (res.status === 200) {
                setSuccess(true);
              }
            })
            .catch((err: any) => {
              setError(err.response.data.error.message);
              console.log(err.response.data.error.message);
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
                    Merci de renseigner votre adresse email, vous recevrez un lien vous permettant de réinitialiser
                    votre mot de passe.
                  </Text>
                  <Input
                    isCollapsed={false}
                    label="Renseigner votre email"
                    placeholder="Email"
                    name="email"
                    isRequired
                    autoComplete="email"
                  />

                  <Text color="red" fontSize="12px" mt="10px">
                    {errors}
                  </Text>

                  <Button mt="40px" type="submit" disabled={!isValid || isSubmitting} variant="roundedBlue">
                    Reinitialiser mon mot de passe
                  </Button>
                  <Box textAlign="center">
                    <Link href="/connexion">
                      <Button mt="40px" type="submit" variant="link">
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
