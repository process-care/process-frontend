'use client'

import { useState, useMemo, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image.js'

import Filters from '@/components/Dashboard/Filters/index.tsx'
import Loader from '@/components/Spinner/index.tsx'
import SurveyGrid from '@/components/SurveyGrid/index.tsx'
import NoData from '@/components/SurveyGrid/noData/index.tsx'

import { client } from '@/api/gql-client.js'
import { useMediaQueries } from '@/utils/hooks/mediaqueries.js'

import { useSurveyPublishedQuery } from './portal.gql.generated.js'
import { ShowMore } from '@/components/ShowMore.tsx'

// ---- CONSTS

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

export default function Portail() {
  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id)

  const [pagination, setPagination] = useState<number>(0)
  const { isTablet } = useMediaQueries()

  // Get all published surveys
  const { data: publishedResult, isLoading } = useSurveyPublishedQuery(client, {
    page: pagination,
  });

  const [state, setState] = useState<any>([]);

  const filteredSurveys = useMemo(() => {
    if (!publishedResult) return [];

    return publishedResult.surveys?.data?.filter(
      (survey: any) => currentFilter === "all" || survey.attributes?.status === currentFilter
    );
  }, [currentFilter, publishedResult]);

  useEffect(() => {
    if (state !== publishedResult?.surveys?.data && filteredSurveys) {
      setState([...state, ...filteredSurveys]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredSurveys]);

  const totalCount = publishedResult?.surveys?.meta.pagination.total;

  return (
    <Box w="100%">
      <Box position="relative" h={isTablet ? "150px" : "200px"}>
        <Box position="absolute" color="white" zIndex="2" top="20px" left={isTablet ? "5%" : "70px"}>
          <Text variant="xxl" fontWeight="900" maxW="1000px" w="auto" textAlign="left" marginLeft="-3px" mb="10px">
            {t.title}
          </Text>
          <Text variant={isTablet ? "currentLight" : "baseline"} maxW="1000px">
            <strong>P</strong>latform for <strong>R</strong>esearch <strong>O</strong>nline and <strong>C</strong>itiz
            <strong>E</strong>n <strong>S</strong>cience <strong>S</strong>urveys <br />
          </Text>
        </Box>

        <ShowMore className='absolute object-cover h-[150px] sm:h-[200px] w-full' />
      </Box>

      <Box p={isTablet ? "5%" : "2% 5%"} display="flex" justifyContent="space-between" flexDir={isTablet ? "column" : "row"}>
        <Box
          display="flex"
          alignItems={isTablet ? "flex-start" : "center"}
          w="100%"
          flexDirection={isTablet ? "column" : "row"}
          justifyContent="flex-start"
        >
          <Filters filters={t.filters} handleClick={(id) => setCurrentFilter(id)} currentFilter={currentFilter} />
          <Text textAlign="left" variant="xs" color="gray.600" mt={isTablet ? "5px" : "0"} ml={isTablet ? "0" : "10px"}>
            { totalCount && totalCount > 0 ? `${totalCount} projets en cours` : 'Aucun projet en cours' } 
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
          <Box margin="0 auto" display="flex" justifyContent="center">
            <ShowMore />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};