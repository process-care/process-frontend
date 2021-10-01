import React, { useState, useEffect } from "react";
import IRoute from "types/routes/route";
import { Box, Container, Text, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { t } from "static/dashboard";
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
  actions as actionsSurveys,
  selectors as selectorsSurveys,
} from "redux/slices/surveys";

export const Dashboard: React.FC<IRoute> = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();
  const surveys = useAppSelector(selectorsSurveys.getAllSurveys);
  const error = useAppSelector(selectorsSurveys.error);
  const isLoading = useAppSelector(selectorsSurveys.isLoading);

  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const isProfilPage = location.pathname === "/profil";

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey["survey"] | null>(
    null
  );

  const toggleOff = () => {
    setMenuIsOpen(false);
  };

  const toggleMenu = (survey: Survey["survey"]) => {
    if (isOpen) {
      dispatch(actionsApplication.setSelectedSurvey(survey.id));
      setSelectedSurvey(survey);
    } else {
      dispatch(actionsApplication.setSelectedSurvey(survey.id));
      setSelectedSurvey(survey);
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
    dispatch(actionsSurveys.initialize(user.id));
  }, [user.id]);

  if (isLoading || surveys === undefined) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const surveysLenght = surveys.length;

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

      <div className="background__grid">
        <Container textAlign="left" pt="9" maxW="90%">
          <Flex justifyContent="space-between" alignItems="center">
            <Text variant="xl" mb={7}>
              {surveysLenght > 1
                ? `Mes ${surveysLenght} enquêtes`
                : "Mon enquête"}
            </Text>
            <Button onClick={goToCreateSurvey} variant="roundedBlue" zIndex="0">
              {t.cta}
            </Button>
          </Flex>

          <Filters
            filters={t.filters}
            handleClick={(id) => setCurrentFilter(id)}
            currentFilter={currentFilter}
          />
          <Box mt={8}>
            <Table columns={columns} data={data} onClick={toggleMenu} />
          </Box>
        </Container>
      </div>
      <ProjectMenu
        menuIsOpen={menuIsOpen}
        selectedSurvey={selectedSurvey}
        onClose={toggleOff}
      />
    </Box>
  );
};
