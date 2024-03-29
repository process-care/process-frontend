import React, { useState, useEffect } from "react";
import IRoute from "types/routes/route";
import { Box, Container, Text, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { getLabelStatus, t } from "static/dashboard";
import { Filters } from "components/Dashboard/Filters";
import { Table } from "components/Table";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { ProjectMenu } from "components/Dashboard/ProjectMenu";
import Drawer from "components/Drawer";

import dayjs from "dayjs";

import { Survey } from "redux/slices/surveyBuilder";
import { useAppSelector } from "redux/hooks";
import { actions as actionsApplication } from "redux/slices/application";
import { useDispatch } from "react-redux";
import { ProfilForm } from "components/Dashboard/ProfilForm";
import { useAuth } from "components/Authentification/hooks";
import { actions } from "redux/slices/survey-editor";
import {
  actions as actionsMySurveys,
  selectors,
} from "redux/slices/scientistData";

import { NoData } from "components/SurveyGrid/noData";
import { HEADER_HEIGHT } from "components/Menu/SimpleMenu";

export const Dashboard: React.FC<IRoute> = () => {
  const { cookies } = useAuth();
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();
  const surveys = useAppSelector(selectors.mySurveys.getAllSurveys);
  const error = useAppSelector(selectors.mySurveys.error);
  const isLoading = useAppSelector(selectors.mySurveys.isLoading);

  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const isProfilPage = location.pathname === "/profil";

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleOff = () => {
    setMenuIsOpen(false);
  };

  const toggleMenu = (survey: Survey["survey"]) => {
    dispatch(actionsMySurveys.setSelectedSurvey(survey.id));
    if (!isOpen) {
      setMenuIsOpen(true);
    }
  };

  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const data = React.useMemo(() => {
    const orderedList = surveys.sort((a, b) => {
      return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
    });

    if (currentFilter === "all") {
      return orderedList;
    } else {
      return orderedList?.filter((survey) => {
        return survey.status === currentFilter;
      });
    }
  }, [currentFilter, surveys]);

  const columns = React.useMemo(
    () =>
      t.header.map(({ Header, accessor }) => {
        if (accessor === "status") {
          return {
            Header,
            accessor: (d: any) => getLabelStatus(d.status),
          };
        }
        if (accessor === "createdAt") {
          return {
            Header,
            accessor: (d: any) => {
              return dayjs(d.createdAt).format("DD-MM-YYYY");
            },
          };
        } else if (accessor === "total") {
          return {
            Header,
            accessor: (d: any) => d.participations?.length,
          };
        } else
          return {
            Header,
            accessor,
          };
      }),
    []
  );

  const handleDrawer = () => {
    dispatch(actionsApplication.toogleDrawer());
  };

  const closeDrawer = () => {
    history.push("/dashboard");
    handleDrawer();
  };

  const goToCreateSurvey = () => {
    dispatch(actions.reset());
    history.push(`/survey/draft/create/metadatas`);
  };

  useEffect(() => {
    dispatch(actionsMySurveys.initializeSurveys(cookies.user.id));
  }, [cookies.user.id]);

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
    <Box d="flex" justifyContent="space-around" w="100%">
      <Box h="80vh">
        <Drawer
          isOpen={isProfilPage && isOpen}
          size="md"
          content={<ProfilForm />}
          onOverlayClick={closeDrawer}
        />
      </Box>

      <div
        className="background__grid"
        style={{ width: menuIsOpen ? "47%" : "100%" }}
      >
        <Container
          textAlign="left"
          pt="9"
          maxW="90%"
          h={`calc(100vh - ${HEADER_HEIGHT})`}
        >
          <Flex justifyContent="space-between" alignItems="center">
            {hadSurveys && (
              <>
                <Text variant="xl" mb={7}>
                  {surveysLenght > 1
                    ? `Mes ${surveysLenght} enquêtes`
                    : "Mon enquête"}
                </Text>

                <Button
                  onClick={goToCreateSurvey}
                  variant="roundedBlue"
                  zIndex="0"
                >
                  {t.cta}
                </Button>
              </>
            )}
          </Flex>

          {hadSurveys ? (
            <>
              <Filters
                filters={t.filters}
                handleClick={(id) => setCurrentFilter(id)}
                currentFilter={currentFilter}
              />
              {hadFilteredSurvys ? (
                <Box mt={8}>
                  <Table columns={columns} data={data} onClick={toggleMenu} />
                </Box>
              ) : (
                <Box w="100%" m="0 auto">
                  <NoData content="Vous n'avez pas d'enquêtes ayant ce status" />
                </Box>
              )}
            </>
          ) : (
            <Box w="80%" m="0 auto" textAlign="center">
              <NoData content="Vous n'avez aucun projet" />
              <Button
                onClick={goToCreateSurvey}
                variant="roundedBlue"
                zIndex="0"
              >
                {t.cta}
              </Button>
            </Box>
          )}
        </Container>
      </div>
      {hadSurveys && (
        <ProjectMenu menuIsOpen={menuIsOpen} onClose={toggleOff} />
      )}
    </Box>
  );
};
