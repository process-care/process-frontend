"use client"

import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/components/Authentification/hooks";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";
import Footer from "@/components/Footer";
import SimpleMenu from "@/components/Menu/SimpleMenu";
import MainMenu from "../MainMenu";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  const { isAuthenticated } = useAuth();
  const { isTablet } = useMediaQueries();

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
      <Div100vh>
        <Box h="100%" alignItems="center" display="flex" justifyContent="center" className="background__grid">
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
      </Div100vh>
    );
  }

  return (
    <Box textAlign="center" fontSize="xl">
      {renderMenu()}
      {children}
      {renderFooter()}
    </Box>
  );
};
