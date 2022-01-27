import { Box } from "@chakra-ui/react";
import { ForgotPasswordForm } from "components/Authentification/ForgotPasswordForm";
import React from "react";
import Div100vh from "react-div-100vh";
import IRoute from "types/routes/route";

export const ForgotPassword: React.FC<IRoute> = () => {
  return (
    <Div100vh>
      <Box
        h="100%"
        alignItems="center"
        d="flex"
        justifyContent="center"
        className="background__grid"
      >
        <ForgotPasswordForm />
      </Box>
    </Div100vh>
  );
};
