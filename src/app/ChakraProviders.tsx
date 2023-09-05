'use client'

import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
// import { CacheProvider } from '@chakra-ui/next-js'

import theme from "@/theme";

export function ChakraProviders({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    // <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <CSSReset />
        {children}
      </ChakraProvider>
    // </CacheProvider>
  )
}