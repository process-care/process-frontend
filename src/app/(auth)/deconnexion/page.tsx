'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { actions as appActions } from "@/redux/slices/scientistData"
import Loader from "@/components/Spinner"
import { useAppDispatch } from "@/redux/hooks"

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  useEffect(() => {
    // Kill redux data
    dispatch(appActions.logout())
    // Redirect
    router.push("/connexion")
  }, [dispatch, router])

  // This displays nothing, it's just unloading stuff
  return <Loader />
}
