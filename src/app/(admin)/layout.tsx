'use client'

import ProtectedRoutes from '../ProtectedRoutes'

// ---- TYPES

type Props = {
  children: React.ReactNode
}

// ---- COMPONENT

export default function RestrictedAdminLayout({ children }: Props) {
  return (
    <ProtectedRoutes>
      {children}
    </ProtectedRoutes>
  )
}
