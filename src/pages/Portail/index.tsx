import { Box, Text, Center, Input } from "@chakra-ui/react";
import { SurveyGrid } from "components/SurveyGrid";
import React, { useState, useMemo, useEffect } from "react";
import IRoute from "types/routes/route";
import { Image } from "@chakra-ui/react";

import Hero from "assets/hero.jpg";
import { Filters } from "components/Dashboard/Filters";
import { NoData } from "components/SurveyGrid/noData";
import { Loader } from "components/Spinner";

import { ReactComponent as ShowMore } from "./assets/ShowMore.svg";
import { useSurveyPublishedQuery, useSurveySearchQuery } from "./portal.gql.generated";
import { client } from "api/gql-client";

// ---- STATIC

const t = {
  title:
    "Une plateforme de curation scientifique curabitur blandit tempus porttitor.",
  filters: [
    { label: "Tout voir", id: "all" },
    // { label: "Les plus populaires", id: "mostViewed" },
    // { label: "Les plus récents", id: "newest" },
    { label: "En cours", id: "pending" },
    { label: "Archivés", id: "archived" },
  ],
};

const ITEMS_PER_PAGE = 10;

// ---- COMPONENT

export const Portail: React.FC<IRoute> = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);
  const [query, setQuery] = useState<string>("");
  const [pagination, setPagination] = useState<number>(0);

  // Get all published surveys
  const { data: publishedResult, isLoading } = useSurveyPublishedQuery(client, { page: pagination });
  // Get surveys related to the searched query
  const {
    data: searchResult,
    isLoading: loadingSearch,
  } = useSurveySearchQuery(client, { query });

  const [state, setState] = useState<any>([]);

  const filteredSurveys = useMemo(() => {
    console.log(publishedResult);
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
  const isSearching = query !== "";

  return (
    <Box>
      <Box>
        <Center
          position="absolute"
          color="white"
          textAlign="left"
          p="10%"
          h="90vh"
          d="flex"
          flexDir="column"
        >
          <Text variant="xxl" maxW="1000px">
            {t.title}
          </Text>
          <Text variant="current" maxW="1000px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            doloremque unde excepturi similique fugit, voluptatum, veniam rerum
            itaque pariatur perspiciatis quas veritatis necessitatibus,
            praesentium laborum magnam esse cum et repudiandae. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Deserunt doloremque
            unde excepturi similique fugit, voluptatum, veniam rerum itaque
            pariatur perspiciatis quas veritatis necessitatibus, praesentium
            laborum magnam esse cum et repudiandae.
          </Text>
        </Center>
        <Image
          src={Hero}
          alt="Process"
          boxSize="100%"
          h="90vh"
          objectFit="cover"
        />
      </Box>

      <Box py="40px" maxW="800px" margin="0 auto">
        <Text>
          Une plateforme de curation scientifique{" "}
          <strong>{totalCount} projets en cours</strong> tempus porttitor. Duis
          mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit.
        </Text>
      </Box>

      <Box pb="80px">
        <Box
          px="10%"
          pt="20px"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Filters
            filters={t.filters}
            handleClick={(id) => setCurrentFilter(id)}
            currentFilter={currentFilter}
          />
          <Box w="50%">
            <Input
              name="search"
              label="Recherche de projet par titre"
              placeholder="Recherche de projet par titre"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Box>

        {isSearching ? (
          searchResult?.surveys && searchResult.surveys?.data.length > 0 ? (
            <SurveyGrid
              surveys={searchResult.surveys?.data}
              isLoading={loadingSearch}
            />
          ) : loadingSearch ? (
            <Loader />
          ) : (
            <NoData content="Nous n'avons pas trouvé d'enquêtes pour votre recherche." />
          )
        ) : state.length > 0 ? (
          <SurveyGrid surveys={state} isLoading={isLoading} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <NoData content="Nous n'avons pas trouvé d'enquêtes pour votre recherche." />
        )}
      </Box>
      {totalCount && state.length < totalCount && (
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
      )}
    </Box>
  );
};
