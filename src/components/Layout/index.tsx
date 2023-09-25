"use client"

import { useEffect } from "react"
import { Box, Button } from "@chakra-ui/react"
import { use100vh } from "react-div-100vh"
import { usePathname } from "next/navigation.js"
import Link from "next/link.js"

import { useAuth } from "@/components/Authentification/hooks/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import Footer from "@/components/Footer/index.tsx"
import SimpleMenu from "@/components/Menu/SimpleMenu/index.tsx"
import MainMenu from "../MainMenu/index.tsx"

// ---- TYPES

interface Props {
  children: React.ReactNode;
}

// ---- CONSTANTS

const authPage = [
  "/connexion",
  "/deconnexion",
  "/attente-de-validation",
  "/inscription",
  "/mot-de-passe-oublie",
  "/nouveau-mot-de-passe",
]

const simplePage = [
  "/dashboard",
  "/profil"
]

// ---- COMPONENT

export default function Layout({ children }: Props): JSX.Element {
  const { isLoading, isAuthenticated } = useAuth()
  const { isTablet } = useMediaQueries()
  const pathname = usePathname()
  const height = use100vh()

  const isSurveyPages = pathname.search("/survey/") !== -1
  const isPortail = pathname === "/"
  const isEditor = pathname.includes("create/landing")
  const isAuthPage = authPage.includes(pathname)

  const renderMenu = () => {
    // Menu are only for authenticated users
    if (isLoading || !isAuthenticated) return null
    
    // Menu for the base pages
    if (simplePage.includes(pathname)) return <SimpleMenu />
    // Menu for the portal
    if (isPortail) return <SimpleMenu isPortail />
    // No menu for survey or auth pages
    if (isSurveyPages || isAuthPage) return null
    
    // Default
    return <MainMenu />
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if ((isTablet && !isSurveyPages && !isPortail && !isAuthPage) || (isTablet && isEditor)) {
    return (
      <Box h={height ?? '100vh'} alignItems="center" display="flex" justifyContent="center" className="background__grid">
        <Box
          backgroundColor="white"
          p={isTablet ? "30px 20px" : "50px"}
          border="1px solid"
          borderColor="brand.line"
          w="90%"
          textAlign="center"
          borderRadius="5px"
          display="flex"
          flexDirection="column"
        >
          Page non disponible sur mobile
          <Link href="/">
            <Button mt="40px" variant="roundedBlue">
              Revenir au portail
            </Button>
          </Link>
        </Box>
      </Box>
    )
  }

  return (
    <Box textAlign="center" fontSize="xl">
      {renderMenu()}

      {children}

      { isPortail &&
        <Footer />
      }
    </Box>
  );
};
