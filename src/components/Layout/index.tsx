import { Box, Button } from "@chakra-ui/react";
import { Footer } from "components/Footer";
import { SimpleMenu } from "components/Menu/SimpleMenu";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "components/Authentification/hooks";

import MainMenu from "../MainMenu";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import Div100vh from "react-div-100vh";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const { isTablet } = useMediaQueries();
  const isSurveyPages = pathname.search("/survey/") !== -1;
  const isPortail = pathname === "/";
  const authPage = [
    "/connexion",
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
  }, [location.pathname]);

  const renderFooter = () => {
    if (isPortail) return <Footer />;
  };

  if (isTablet && !isSurveyPages && !isPortail && !isAuthPage) {
    return (
      <Div100vh>
        <Box
          h="100%"
          alignItems="center"
          d="flex"
          justifyContent="center"
          className="background__grid"
        >
          <Box
            backgroundColor="white"
            p={isTablet ? "30px 20px" : "50px"}
            border="1px solid"
            borderColor="brand.line"
            w="90%"
            textAlign="center"
            borderRadius="5px"
            d="flex"
            flexDirection="column"
          >
            Page non disponible sur mobile
            <NavLink to="/">
              <Button mt="40px" variant="roundedBlue">
                Revenir au portail
              </Button>
            </NavLink>
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
