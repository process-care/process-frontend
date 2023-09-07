'use client'

import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import LoginForm from "./Login/index.tsx"
import SigninForm from "./Signin/index.tsx"
import { BlackLogo } from "@/components/Logos.tsx"

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
        <BlackLogo />
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
