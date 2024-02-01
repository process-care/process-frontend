'use client'

import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import theme from "@/theme/index.tsx"

export function ChakraProviders({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <CSSReset />
      {children}
    </ChakraProvider>
  )
}