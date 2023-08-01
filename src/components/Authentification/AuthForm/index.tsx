'use client'

import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";
import LoginForm from "./Login";
import SigninForm from "./Signin";

import Logo from "@/assets/black_logo.svg";

export default function AuthForm(): JSX.Element {
  const router = useRouter()
  const [isSigninPage, setIsSigninPage] = useState(false);
  const isConnected = useAppSelector((state) => state.scientistData.auth.isConnected);
  const { isTablet } = useMediaQueries();

  if (isConnected) {
    router.push("/dashboard");
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
      <Box pt={isTablet ? "20px" : "90px"}>
        {isSigninPage ? <SigninForm cancel={() => setIsSigninPage(false)} /> : <LoginForm />}
      </Box>

      {!isSigninPage && (
        <>
          <Text my="3" variant="currentLight">
            OU
          </Text>
          <Button onClick={() => setIsSigninPage(true)} variant="rounded" className="w-full">
            Créer un compte
          </Button>
        </>
      )}
    </Box>
  );
};
