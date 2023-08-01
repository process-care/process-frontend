'use client'

import { useEffect } from 'react'

import { useAuth } from '@/components/Authentification/hooks';
import { client } from '@/api/gql-client';
import { buildBearer } from '@/utils/auth';


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
