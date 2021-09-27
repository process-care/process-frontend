import { Center } from "@chakra-ui/react";
import { ForgotPasswordForm } from "components/Authentification/ForgotPasswordForm";
import React from "react";
import IRoute from "types/routes/route";

export const ForgotPassword: React.FC<IRoute> = () => {
  return (
    <div className="background__grid">
      <Center h="100vh" justifyContent="center">
        <ForgotPasswordForm />
      </Center>
    </div>
  );
};
