import React, { useState } from "react";
import IRoute from "types/routes/route";
import { Box, Container, Text, Center, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { t } from "static/dashboard";
import { Filters } from "components/Dashboard/Filters";
import { Table } from "components/Table";
import { useAddSurvey, useGetSurveys } from "call/actions/survey";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { ProjectMenu } from "components/Dashboard/ProjectMenu";
import Drawer from "components/Drawer";

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { useAddPage } from "call/actions/formBuider/page";
import { Survey } from "redux/slices/surveyBuilder";
import { useAppSelector } from "redux/hooks";
import { toogleDrawer } from "redux/slices/application";
import { useDispatch } from "react-redux";

export const Dashboard: React.FC<IRoute> = () => {
  const { data: surveys, isLoading, error } = useGetSurveys();
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();
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
    setMenuIsOpen((prev) => !prev);
    setSelectedSurvey(survey);
  };

  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const data = React.useMemo(() => surveys?.surveys, [surveys?.surveys]);
  const uuid = uuidv4();

  const createSurvey = async () => {
    const res = await addSurvey({
      // Title will be overide by the user in the next step.
      title: `temporyTitle-${uuid}`,
      slug: `temporySlug-${uuid}`,
      status: "draft",
    });
    // create survey first page
    await addPage({
      name: `Page 1`,
      is_locked: false,
      short_name: `P1`,
      survey: res.createSurvey.survey.id,
    });

    history.push(`/survey/${res.createSurvey.survey.id}/create/metadatas`);
  };

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

  React.useEffect(() => {
    if (isProfilPage) {
      handleDrawer();
    }
  }, [isProfilPage]);

  if (isLoading || surveys === undefined) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (data?.length === 0) {
    return <Center h="100vh">{t.noData}</Center>;
  }

  return (
    <Box
      h="100%"
      d="flex"
      justifyContent="space-around"
      w="100%"
      overflow="hidden"
    >
      <Drawer
        isOpen={isProfilPage && isOpen}
        size="md"
        content={<p>Mon profil ...</p>}
        onOverlayClick={handleDrawer}
      />
      <div className="background__grid">
        <Container textAlign="left" pt="9" maxW="90%">
          <Flex justifyContent="space-between" alignItems="center">
            <Text variant="xl" mb={7}>
              {t.my_projects}
            </Text>
            <Button onClick={createSurvey} variant="roundedBlue">
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
