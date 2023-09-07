'use client'

import { useEffect } from 'react'

import { useAuth } from '@/components/Authentification/hooks/index.js';
import { client } from '@/api/gql-client.js'
import { buildBearer } from '@/utils/auth.js'


// ---- TYPES

type Props = {
  children: React.ReactNode
}

// ---- COMPONENT

export default function AdminLayout({
  children,
}: Props) {
  const { isLoading, cookies } = useAuth()

  // Set GQL client's header if jwt is present
  useEffect(() => {
    if (isLoading || !cookies?.jwt) return
    client.setHeader("Authorization", buildBearer(cookies.jwt));
  }, [isLoading, cookies?.jwt])

  return (
    <>
      {children}
    </>
  )
}
