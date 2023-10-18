'use client'

import { Box } from "@chakra-ui/react"
import { use100vh } from "react-div-100vh"

import NewPasswordForm from "@/components/Authentification/NewPassword/index.tsx"

export default function NewPassword(): JSX.Element {
  const height = use100vh()

  return (
      <Box
        h={height ?? '100vh'}
        alignItems="center"
        display="flex"
        justifyContent="center"
        className="background__grid"
      >
        <NewPasswordForm />
      </Box>
  )
}
