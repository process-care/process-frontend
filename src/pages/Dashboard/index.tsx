import React, { useState } from "react";
import IRoute from "types/routes/route";
import { Box, Container, Text } from "@chakra-ui/react";

import { t } from "static/dashboard";
import { Filters } from "components/Dashboard/Filters";
import { Table } from "components/Table";
import { useGetSurveys } from "call/actions/survey";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { ProjectMenu } from "components/Dashboard/ProjectMenu";

import dayjs from "dayjs";

export const Dashboard: React.FC<IRoute> = () => {
  const { data: surveys, isLoading, error } = useGetSurveys();
  console.log(surveys);

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
          <Text variant="xl" mb={7}>
            {t.my_projects}
          </Text>
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
