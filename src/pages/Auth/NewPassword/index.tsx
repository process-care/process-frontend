import { Box } from "@chakra-ui/react";
import { NewPasswordForm } from "components/Authentification/NewPassword";
import React from "react";
import Div100vh from "react-div-100vh";
import IRoute from "types/routes/route";

export const NewPassword: React.FC<IRoute> = () => {
  return (
    <Div100vh>
      <Box
        h="100%"
        alignItems="center"
        d="flex"
        justifyContent="center"
        className="background__grid"
      >
        <NewPasswordForm />
      </Box>
    </Div100vh>
  );
};
