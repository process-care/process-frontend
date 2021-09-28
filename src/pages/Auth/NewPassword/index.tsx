import { Center } from "@chakra-ui/react";
import { NewPasswordForm } from "components/Authentification/NewPassword";
import React from "react";
import IRoute from "types/routes/route";

export const NewPassword: React.FC<IRoute> = () => {
  return (
    <div className="background__grid">
      <Center h="100vh" justifyContent="center">
        <NewPasswordForm />
      </Center>
    </div>
  );
};
