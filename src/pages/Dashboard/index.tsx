import React, { useState } from "react";
import IRoute from "types/routes/route";
import { Box, Container, Text, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { t } from "static/dashboard";
import { Filters } from "components/Dashboard/Filters";
import { Table } from "components/Table";
import { useGetMySurveys } from "call/actions/survey";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { ProjectMenu } from "components/Dashboard/ProjectMenu";
import Drawer from "components/Drawer";

import dayjs from "dayjs";

import { Survey } from "redux/slices/surveyBuilder";
import { useAppSelector } from "redux/hooks";
import { toogleDrawer } from "redux/slices/application";
import { useDispatch } from "react-redux";
import { ProfilForm } from "components/Dashboard/ProfilForm";
import { useCreateSurveyChain } from "./hooks";
import { useAuth } from "components/Authentification/hooks";

export const Dashboard: React.FC<IRoute> = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();

  const { data: surveys, isLoading, error } = useGetMySurveys(user.id);

  const { createSurveyChain } = useCreateSurveyChain();
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);
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
      setSelectedSurvey(survey);
    } else {
      setSelectedSurvey(survey);
      setMenuIsOpen(true);
    }
  };

  console.log(isOpen);

  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const data = React.useMemo(() => {
    const orderedList = surveys?.surveys.sort((a, b) => {
      return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
    });

    if (currentFilter === "all") {
      return orderedList;
    } else {
      return orderedList?.filter((survey) => {
        return survey.status === currentFilter;
      });
    }
  }, [currentFilter, surveys?.surveys]);

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
            accessor: (d: any) => d.participations.length,
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
    dispatch(toogleDrawer());
  };

  const closeDrawer = () => {
    history.push("/dashboard");
    handleDrawer();
  };

  if (isLoading || surveys === undefined) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  const surveysLenght = surveys.surveys.length;

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
            <Button
              onClick={createSurveyChain}
              variant="roundedBlue"
              zIndex="0"
            >
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
