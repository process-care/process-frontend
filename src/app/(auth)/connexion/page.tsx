'use client'

import { Box } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";

import AuthForm from "@/components/Authentification/AuthForm";

export default function Login(): JSX.Element {
  return (
    <Div100vh>
      <Box h="100%" alignItems="center" display="flex" justifyContent="center" className="background__grid">
        <AuthForm />
      </Box>
    </Div100vh>
  );
};
