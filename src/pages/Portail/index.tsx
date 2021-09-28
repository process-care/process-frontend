import { Box, Text, Center } from "@chakra-ui/react";
import { SurveyGrid } from "components/SurveyGrid";
import React, { useState, useMemo } from "react";
import IRoute from "types/routes/route";
import { Image } from "@chakra-ui/react";

import Hero from "assets/hero.jpg";
import { useGetSurveys } from "call/actions/survey";
import { Filters } from "components/Dashboard/Filters";

// STATIC

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
export const Portail: React.FC<IRoute> = () => {
  const { data: surveys, isLoading } = useGetSurveys();
  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);

  const filteredSurveys = useMemo(
    () =>
      surveys?.surveys?.filter((survey) => {
        if (currentFilter === "all") return surveys.surveys;
        if (currentFilter === "pending") return survey.status === "pending";

        if (currentFilter === "archived") return survey.status === "archived";
      }),
    [currentFilter, surveys]
  );

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
          <strong>{surveys?.surveys.length} projets en cours</strong> tempus
          porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula, eget lacinia odio sem nec elit.
        </Text>
      </Box>

      <Box pb="80px">
        <Box px="10%" pt="20px">
          <Filters
            filters={t.filters}
            handleClick={(id) => setCurrentFilter(id)}
            currentFilter={currentFilter}
          />
        </Box>

        <SurveyGrid surveys={filteredSurveys} isLoading={isLoading} />
      </Box>
    </Box>
  );
};
