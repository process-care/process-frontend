'use client'

import { Box } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";

import ForgotPasswordForm from "@/components/Authentification/ForgotPasswordForm/index.tsx"

export default function ForgotPassword(): JSX.Element {
  return (
    <Div100vh>
      <Box h="100%" alignItems="center" display="flex" justifyContent="center" className="background__grid">
        <ForgotPasswordForm />
      </Box>
    </Div100vh>
  );
};
