'use client'

import { useEffect } from "react";
import { Text, Button, Center, Box } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions } from "@/redux/slices/scientistData";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";
import { getUser } from "@/redux/slices/scientistData/auth";

import Logo from "@/assets/black_logo.svg";

const t = {
  title: " 👌 Bienvenue !",
  content:
    "Votre inscription sur la plateforme doit être validée par un administrateur. Vous en serez notifié par e-mail.",
  cta: {
    refresh: "Rafraîchir",
    backToPortal: "Retourner au portail",
  },
};

export default function SuccessPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isTablet } = useMediaQueries();

  const auth = useAppSelector(getUser);

  // Refresh user's data if not validated, redirect if it is
  useEffect(() => {
    if (auth?.user?.validated) {
      router.push("/dashboard");
      return;
    }

    dispatch(actions.refresh());
  }, [auth?.user?.validated, dispatch, router]);

  // If no auth data, redirect to login
  if (!auth) {
    router.push("/connexion");
    return <></>;
  }

  // Go to dashboard to attempt a refresh
  const refreshClick = () => {
    dispatch(actions.logged(auth));
    router.push("/dashboard");
  };

  // Go to portal
  const toPortalClick = () => {
    dispatch(actions.logged(auth));
    router.push("/");
  };

  return (
    <Div100vh>
      <Box h="100%" alignItems="center" display="flex" justifyContent="center" className="background__grid">
        <Box
          backgroundColor="white"
          p={isTablet ? "30px 20px" : "50px"}
          border="1px solid"
          borderColor="brand.line"
          w={isTablet ? "90%" : "480px"}
        >
          <Box display="flex" justifyContent="center" w="150px" m="0 auto">
            <Image src={Logo} alt="Logo" />
          </Box>
          <Box pt={isTablet ? "20px" : "60px"}>
            <Center h="100%" display="flex" flexDirection="column">
              <Text variant="xl" py="20px">
                {t.title}
              </Text>
              <Text variant="current">{t.content}</Text>
              <Box display="flex" flexDirection="row" justifyContent="center" mt="40px">
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
