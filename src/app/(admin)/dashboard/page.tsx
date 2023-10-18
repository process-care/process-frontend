'use client'

import { useState, useEffect, useMemo } from "react";
import { Box, Container, Text, Flex, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation.js"

import { t } from "@/static/dashboard.js";
import { useAppSelector } from "@/redux/hooks/index.js";
import { actions as actionsApplication } from "@/redux/slices/application/index.js";
import { actions as actionsMySurveys, selectors } from "@/redux/slices/scientistData.js";
import { useAuth } from "@/components/Authentification/hooks/index.js"
import { actions } from "@/redux/slices/survey-editor.js"

import ProjectMenu from "@/components/Dashboard/ProjectMenu/index.tsx"
import Filters from "@/components/Dashboard/Filters/index.tsx"
import Drawer from "@/components/Drawer/index.tsx"
import ProfilForm from "@/components/Dashboard/ProfilForm/index.tsx"
import NoData from "@/components/SurveyGrid/noData/index.tsx"

import { HEADER_HEIGHT } from "@/components/Menu/SimpleMenu/index.tsx"
import Table from "@/components/Table/index.tsx"
import Loader from "@/components/Spinner/index.tsx"
import Error from "@/components/Error/index.tsx"

export default function Dashboard(): JSX.Element {
  const { cookies } = useAuth();
  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useDispatch();
  const surveys = useAppSelector(selectors.mySurveys.selectAllSurveys);
  const error = useAppSelector(selectors.mySurveys.error);
  const isLoading = useAppSelector(selectors.mySurveys.isLoading);

  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const isProfilPage = pathname === "/profil";

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleOff = () => {
    setMenuIsOpen(false);
  };

  const toggleMenu = (surveyId: string) => {
    dispatch(actionsMySurveys.setSelectedSurvey(surveyId));
    if (!isOpen) {
      setMenuIsOpen(true);
    }
  };

  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const data = useMemo(() => {
    const orderedList = surveys.sort((a, b) => {
      return dayjs(b?.attributes?.createdAt).valueOf() - dayjs(a?.attributes?.createdAt).valueOf();
    });

    if (currentFilter === "all") {
      return orderedList;
    } else {
      return orderedList?.filter((survey) => {
        return survey?.attributes?.status === currentFilter;
      });
    }
  }, [currentFilter, surveys]);

  const handleDrawer = () => dispatch(actionsApplication.toogleDrawer())

  const closeDrawer = () => {
    router.push("/dashboard");
    handleDrawer();
  };

  const goToCreateSurvey = () => {
    dispatch(actions.reset());
    router.push(`/survey/draft/create/metadatas`);
  };

  useEffect(() => {
    if (!cookies?.user?.id) return
    dispatch(actionsMySurveys.initializeSurveys(cookies?.user?.id));
  }, [cookies?.user?.id, dispatch]);

  if (isLoading || surveys === undefined) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const surveysLenght = surveys.length;
  const hadSurveys = surveysLenght > 0;
  const hadFilteredSurvys = data.length > 0;

  return (
    <Box display="flex" h={`calc(100vh - ${HEADER_HEIGHT})`} justifyContent="space-around" w="100%">
      <Box h="80vh">
        <Drawer isOpen={isProfilPage && isOpen} size="md" content={<ProfilForm />} onOverlayClick={closeDrawer} />
      </Box>

      <div className="background__grid overflow-auto" style={{ width: menuIsOpen ? "47%" : "100%" }}>
        <Container textAlign="left" py="9" maxW="90%">
          {hadSurveys ? (
            <>
              <Text variant="xl" fontWeight="bold" mb="10px">
                {surveysLenght > 1 ? `Mes ${surveysLenght} projets` : "Mon projet"}
              </Text>

              <Flex justifyContent="space-between" alignItems="flex-end">
                <Filters filters={t.filters} handleClick={setCurrentFilter} currentFilter={currentFilter} />

                {hadSurveys && (
                  <>
                    <Button onClick={goToCreateSurvey} variant="roundedBlue" zIndex="0">
                      {t.cta}
                    </Button>
                  </>
                )}
              </Flex>

              {hadFilteredSurvys ? (
                <Box
                  mt={3}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e7e7e7",
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "rgb(33 33 52 / 10%) 0px 1px 4px",
                  }}
                >
                  <Table data={data} onClick={toggleMenu} />
                </Box>
              ) : (
                <Box w="100%" m="0 auto">
                  <NoData content="Vous n'avez pas de projet ayant ce status" />
                </Box>
              )}
            </>
          ) : (
            <Box w="80%" m="0 auto" textAlign="center">
              <NoData content="Vous n'avez aucun projet" />
              <Button onClick={goToCreateSurvey} variant="roundedBlue" zIndex="0">
                {t.cta}
              </Button>
            </Box>
          )}
        </Container>
      </div>
      
      {hadSurveys && <ProjectMenu menuIsOpen={menuIsOpen} onClose={toggleOff} />}
    </Box>
  );
};
