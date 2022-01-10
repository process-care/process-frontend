import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { LoginForm } from "./Login";
import { SigninForm } from "./Signin";
import { useAppSelector } from "redux/hooks";
import { useHistory } from "react-router-dom";

export const AuthForm: React.FC = () => {
  const history = useHistory();
  const [isSigninPage, setIsSigninPage] = React.useState(false);
  const isConnected = useAppSelector(
    (state) => state.scientistData.auth.isConnected
  );

  if (isConnected) {
    history.push("/dashboard");
  }

  return (
    <Box
      backgroundColor="white"
      p="50px 50px"
      w="480px"
      h="600px"
      border="1px solid"
      borderColor="brand.line"
    >
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      {isSigninPage ? (
        <SigninForm cancel={() => setIsSigninPage(false)} />
      ) : (
        <LoginForm />
      )}

      {!isSigninPage && (
        <>
          <Text my="5" variant="currentLight">
            OU
          </Text>
          <Button
            onClick={() => setIsSigninPage(true)}
            variant="rounded"
            isFullWidth
          >
            Créer un compte
          </Button>
        </>
      )}
    </Box>
  );
};
