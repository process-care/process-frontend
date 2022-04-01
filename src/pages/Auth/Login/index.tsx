import { Box } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";
import { AuthForm } from "components/Authentification/AuthForm";
import React from "react";
import IRoute from "types/routes/route";

export const Login: React.FC<IRoute> = () => {
  return (
    <Div100vh>
      <Box h="100%" alignItems="center" d="flex" justifyContent="center" className="background__grid">
        <AuthForm />
      </Box>
    </Div100vh>
  );
};
