import { Box, Text } from "@chakra-ui/react";
import { SurveyGrid } from "components/SurveyGrid";
import React, { useState, useMemo, useEffect } from "react";
import IRoute from "types/routes/route";
import { Image } from "@chakra-ui/react";

import Hero from "assets/hero.jpg";
import { Filters } from "components/Dashboard/Filters";
import { NoData } from "components/SurveyGrid/noData";
import { Loader } from "components/Spinner";

import { ReactComponent as ShowMore } from "./assets/ShowMore.svg";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { client } from "api/gql-client";
import { useSurveyPublishedQuery } from "./portal.gql.generated";

const t = {
  title: "Process",
  filters: [
    { label: "Tout voir", id: "all" },
    { label: "En cours", id: "pending" },
    { label: "Archivés", id: "archived" },
  ],
};
const ITEMS_PER_PAGE = 10;

// ---- COMPONENT

export const Portail: React.FC<IRoute> = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const [pagination, setPagination] = useState<number>(0);
  const { isTablet } = useMediaQueries();

  // Get all published surveys
  const { data: publishedResult, isLoading } = useSurveyPublishedQuery(client, {
    page: pagination,
  });

  const [state, setState] = useState<any>([]);

  const filteredSurveys = useMemo(() => {
    if (!publishedResult) return [];

    return publishedResult.surveys?.data?.filter(
      (survey) => currentFilter === "all" || survey.attributes?.status === currentFilter
    );
  }, [currentFilter, publishedResult]);

  useEffect(() => {
    if (state !== publishedResult?.surveys?.data && filteredSurveys) {
      setState([...state, ...filteredSurveys]);
    }
  }, [filteredSurveys]);

  const totalCount = publishedResult?.surveys?.meta.pagination.total;

  return (
    <Box w="100%">
      <Box
        position="absolute"
        color="white"
        zIndex="2"
        top={isTablet ? "80px" : "90px"}
        left={isTablet ? "5%" : "70px"}
      >
        <Text variant="xxl" fontWeight="900" maxW="1000px" w="auto" textAlign="left" marginLeft="-2px">
          {t.title}
        </Text>
        <Text variant={isTablet ? "currentLight" : "baseline"} maxW="1000px">
          <strong>P</strong>latform for <strong>R</strong>esearch <strong>O</strong>nline and <strong>C</strong>itiz
          <strong>E</strong>n <strong>S</strong>cience <strong>S</strong>urveys. <br />
        </Text>
      </Box>

      <Image src={Hero} alt="Process" boxSize="100%" h={isTablet ? "80px" : "200px"} objectFit="cover" pos="absolute" />

      <Box
        pt={isTablet ? "50px" : "110px"}
        pb={isTablet ? "50px" : "160px"}
        maxW={isTablet ? "unset" : "80%"}
        margin="0 auto"
        px="5%"
      ></Box>

      <Box px="5%" d="flex" alignItems="center" justifyContent="space-between" flexDir={isTablet ? "column" : "row"}>
        <Box d="flex" alignItems="center">
          <Filters filters={t.filters} handleClick={(id) => setCurrentFilter(id)} currentFilter={currentFilter} />
          <Text textAlign="left" variant="xs" color="gray.600" ml={isTablet ? "5px" : "0"}>
            {totalCount} projets en cours
          </Text>
        </Box>
      </Box>

      {filteredSurveys && filteredSurveys?.length > 0 ? (
        <SurveyGrid surveys={filteredSurveys} isLoading={isLoading} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <NoData content="Nous n'avons pas trouvé d'enquêtes pour votre recherche." w="90%" />
      )}
      {totalCount && state.length < totalCount ? (
        <Box
          pos="relative"
          margin="0 auto"
          textAlign="center"
          mb="50px"
          onClick={() => setPagination(pagination + ITEMS_PER_PAGE)}
          _hover={{ cursor: "pointer", opacity: 0.6 }}
        >
          <Text variant="current">Afficher plus de Projets</Text>
          <Box margin="0 auto" d="flex" justifyContent="center">
            <ShowMore />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
