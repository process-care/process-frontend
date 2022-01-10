import { Center } from "@chakra-ui/react";
import { AuthForm } from "components/Authentification/AuthForm";
import React from "react";
import IRoute from "types/routes/route";
export const Login: React.FC<IRoute> = () => {
  return (
    <div className="background__grid">
      <Center h="100vh" justifyContent="center">
        <AuthForm />
      </Center>
    </div>
  );
};
