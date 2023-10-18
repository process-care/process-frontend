import { useEffect, useState } from "react";
import { LoginMutation } from "@/api/graphql/queries/auth.gql.generated.ts"

export function useAuth() {
  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial fetch from storage
  useEffect(() => {
    setValue(localStorage.getItem("process__user"))
    setIsLoading(false)
  }, [])

  // If no value, return a empty structure
  if (!value) {
    return {
      isLoading,
      cookies: null,
      isAuthenticated: false,
    }
  }

  const cookies: LoginMutation["login"] = JSON.parse(value)

  return {
    isLoading,
    cookies,
    isAuthenticated: !cookies.user?.blocked && !!cookies.jwt,
  }
};
