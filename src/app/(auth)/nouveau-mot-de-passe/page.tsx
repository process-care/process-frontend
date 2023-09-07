'use client'

import { Box } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";

import NewPasswordForm from "@/components/Authentification/NewPassword/index.tsx";

export default function NewPassword(): JSX.Element {
  return (
    <Div100vh>
      <Box
        h="100%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        className="background__grid"
      >
        <NewPasswordForm />
      </Box>
    </Div100vh>
  );
};
