import React, { useEffect } from "react";
import { Text, Button, Center, Box } from "@chakra-ui/react";
import { ReactComponent as Logo } from "assets/black_logo.svg";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions } from "redux/slices/scientistData";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import Div100vh from "react-div-100vh";
import { useHistory } from "react-router-dom";
import { getUser } from "redux/slices/scientistData/auth";

const t = {
  title: " 👌 Bienvenue !",
  content:
    "Votre inscription sur la plateforme doit être validée par un administrateur. Vous en serez notifié par e-mail.",
  cta: {
    refresh: "Rafraîchir",
    backToPortal: "Retourner au portail",
  },
};

export const SuccessPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isTablet } = useMediaQueries();

  const auth = useAppSelector(getUser);

  // Refresh user's data if not validated, redirect if it is
  useEffect(() => {
    if (auth?.user?.validated) {
      history.push({ pathname: "/dashboard" });
      return;
    }

    dispatch(actions.refresh());
  }, [auth?.user?.validated]);

  // If no auth data, redirect to login
  if (!auth) {
    history.push({ pathname: "/connexion" });
    return <></>;
  }

  // Go to dashboard to attempt a refresh
  const refreshClick = () => {
    dispatch(actions.logged(auth));
    history.push("/dashboard");
  };

  // Go to portal
  const toPortalClick = () => {
    dispatch(actions.logged(auth));
    history.push("/");
  };

  return (
    <Div100vh>
      <Box h="100%" alignItems="center" d="flex" justifyContent="center" className="background__grid">
        <Box
          backgroundColor="white"
          p={isTablet ? "30px 20px" : "50px"}
          border="1px solid"
          borderColor="brand.line"
          w={isTablet ? "90%" : "480px"}
        >
          <Box d="flex" justifyContent="center" w="150px" m="0 auto">
            <Logo />
          </Box>
          <Box pt={isTablet ? "20px" : "60px"}>
            <Center h="100%" d="flex" flexDirection="column">
              <Text variant="xl" py="20px">
                {t.title}
              </Text>
              <Text variant="current">{t.content}</Text>
              <Box d="flex" flexDirection="row" justifyContent="center" mt="40px">
                <Button mr="10px" variant="roundedBlue" onClick={refreshClick}>
                  {t.cta.refresh}
                </Button>
                <Button ml="10px" variant="link" onClick={toPortalClick}>
                  {t.cta.backToPortal}
                </Button>
              </Box>
            </Center>
          </Box>
        </Box>
      </Box>
    </Div100vh>
  );
};
