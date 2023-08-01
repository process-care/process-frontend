'use client'

import { useState } from 'react'
import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'

import theme from "@/theme";
import './globals.css'
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
        <ReduxProvider>
          <ColorModeScript />
          <ChakraProvider theme={theme}>
            <CSSReset />
            <DndProvider backend={HTML5Backend}>
              <Layout>
                {children}
              </Layout>
            </DndProvider>
          </ChakraProvider>
        </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
