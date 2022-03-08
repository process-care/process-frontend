import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { LoginForm } from "./Login";
import { SigninForm } from "./Signin";
import { useAppSelector } from "redux/hooks";
import { useHistory } from "react-router-dom";
import { useMediaQueries } from "utils/hooks/mediaqueries";

export const AuthForm: React.FC = () => {
  const history = useHistory();
  const [isSigninPage, setIsSigninPage] = React.useState(false);
  const isConnected = useAppSelector((state) => state.scientistData.auth.isConnected);
  const { isTablet } = useMediaQueries();
  if (isConnected) {
    history.push("/dashboard");
  }

  return (
    <Box
      backgroundColor="white"
      p={isTablet ? "30px 20px" : "50px"}
      border="1px solid"
      borderColor="brand.line"
      w={isTablet ? "90%" : "480px"}
    >
      <Box d="flex" justifyContent="center" w="150px" m="0 auto">
        <Logo />
      </Box>
      <Box pt={isTablet ? "20px" : "90px"}>
        {isSigninPage ? <SigninForm cancel={() => setIsSigninPage(false)} /> : <LoginForm />}
      </Box>

      {!isSigninPage && (
        <>
          <Text my="3" variant="currentLight">
            OU
          </Text>
          <Button onClick={() => setIsSigninPage(true)} variant="rounded" isFullWidth>
            Créer un compte
          </Button>
        </>
      )}
    </Box>
  );
};
