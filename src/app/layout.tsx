'use client'

import { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'

import './globals.css'

import Layout from '@/components/Layout/index.tsx'
import { ReduxProvider } from '@/redux/ReduxProvider.tsx'
import { ChakraProviders } from './ChakraProviders.tsx'
import { cn } from '@/utils/ui.ts';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en" className='h-[-webkit-fill-available]'>
      <body className={cn(inter.className, 'min-h-[-webkit-fill-available]')}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <ChakraProviders>
              <DndProvider backend={HTML5Backend}>
                <Layout>
                  {children}
                </Layout>
              </DndProvider>
            </ChakraProviders>
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
