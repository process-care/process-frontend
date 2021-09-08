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

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { useAddPage } from "call/actions/formBuider/page";

export const Dashboard: React.FC<IRoute> = () => {
  const { data: surveys, isLoading, error } = useGetSurveys();
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<string>();

  const toggleOff = () => {
    setIsOpen(false);
  };

  const toggleMenu = (surveyId: string) => {
    setIsOpen(!isOpen);
    setSelectedSurvey(surveyId);
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
        isOpen={isOpen}
        surveyId={selectedSurvey}
        onClose={toggleOff}
      />
    </Box>
  );
};
