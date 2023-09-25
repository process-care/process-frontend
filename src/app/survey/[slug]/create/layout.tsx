'use client'

import ProtectedRoutes from '@/app/ProtectedRoutes'

// ---- TYPES

type Props = {
  children: React.ReactNode
}

// ---- COMPONENT

export default function RestrictedCreateLayout({ children }: Props) {
  return (
    <ProtectedRoutes>
      {children}
    </ProtectedRoutes>
  )
}