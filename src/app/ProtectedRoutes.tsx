'use client'

import { useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { useDispatch } from "react-redux"

import { useAppSelector } from '@/redux/hooks'
import { useAuth } from '@/components/Authentification/hooks/index'
import { client } from '@/api/gql-client'
import { buildBearer } from '@/utils/auth'
import { actions } from "@/redux/slices/scientistData"
import Loader from '@/components/Spinner'

// ---- TYPES

type Props = {
  children: React.ReactNode
}

// ---- COMPONENT

export default function ProtectedRoutes({ children }: Props): JSX.Element {
  const dispatch = useDispatch()
  const pathname = usePathname()

  const { isLoading, isAuthenticated, cookies } = useAuth()
  const isConnected = useAppSelector((state) => state.scientistData.auth.isConnected)

  // Hydrate redux store with user data if not already done
  useEffect(() => {
    if (isLoading) return

    if (!isConnected && cookies) {
      dispatch(actions.logged(cookies))
      client.setHeader("Authorization", buildBearer(cookies.jwt))
    }
  // We will update only when "isConnected" or "isLoading" changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isLoading])

  // While it's loading, we wait
  if (isLoading) return <Loader />

  // User is not authenticated, redirect
  if (!isAuthenticated) {
    redirect("/connexion")
  }

  // User is not validated yet, redirect
  if (!cookies?.user?.validated && pathname !== "/attente-de-validation") {
    redirect("/attente-de-validation")
  }

  // User is okay !
  return (
    <>
      {children}
    </>
  )
}
