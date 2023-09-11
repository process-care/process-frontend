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

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  const { isAuthenticated } = useAuth()
  const { isTablet } = useMediaQueries()
  const height = use100vh()

  const pathname = usePathname()
  const isSurveyPages = pathname.search("/survey/") !== -1;
  const isPortail = pathname === "/";
  const isEditor = pathname.includes("create/landing");

  const authPage = [
    "/connexion",
    "/attente-de-validation",
    "/inscription",
    "/mot-de-passe-oublie",
    "/nouveau-mot-de-passe",
  ];
  const isAuthPage = authPage.includes(pathname);

  const renderMenu = () => {
    const isSimpleMenu = ["/dashboard", "/profil"];

    if (isSimpleMenu.includes(pathname)) return <SimpleMenu />;
    if (isPortail && isAuthenticated) return <SimpleMenu isPortail />;
    else if (isSurveyPages || isAuthPage || isPortail) return null;
    else return <MainMenu />;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const renderFooter = () => {
    if (isPortail) return <Footer />;
  };

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
      {renderFooter()}
    </Box>
  );
};
