import { Center } from "@chakra-ui/react";
import { SigninForm } from "components/Authentification/SiginForm";
import React from "react";
import IRoute from "types/routes/route";

export const Signin: React.FC<IRoute> = () => {
  return (
    <div className="background__grid">
      <Center h="100vh" justifyContent="center">
        <SigninForm />
      </Center>
    </div>
  );
};
