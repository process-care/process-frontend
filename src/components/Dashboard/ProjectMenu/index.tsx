import React, { useState } from "react";

import { Box, Button, Container, Flex, Tooltip, Text } from "@chakra-ui/react";
import { API_URL_ROOT } from "constants/api";
import { Filters } from "../Filters";
import { useGetSurveyStats } from "call/actions/survey";
import { Survey } from "redux/slices/surveyBuilder";
import { useNavigator } from "components/CreateSurvey/hooks";

// ---- STATICS

const filters = [
  { label: "24 h", id: "day" },
  { label: "7 jours", id: "week" },
  { label: "1 mois", id: "month" },
  { label: "6 mois", id: "semester" },
  { label: "1 an", id: "year" },
  { label: "Max", id: "all" },
];

// ---- TYPES

interface Props {
  menuIsOpen: boolean;
  selectedSurvey?: Survey["survey"] | null;
  onClose: () => void;
}

// ---- COMPONENT

export const ProjectMenu: React.FC<Props> = ({
  menuIsOpen,
  selectedSurvey,
  onClose,
}) => {
  if (!menuIsOpen || !selectedSurvey) return <></>;

  const {
    title,
    description,
    date,
    stepsLeft,
    statistics,
    exportURL,
    isLoading,
  } = useSurveyData(selectedSurvey.id);
  const { gotToLanding, goToForm, goToConsent, goToSurveyMetadatas } =
    useNavigator(selectedSurvey);
  const [statFilter, setStatFilter] = useState(filters[0].id);

  // We should be doing that much better :/
  if (isLoading) return <div>Loading...</div>;

  const selectedStats = statistics[statFilter];

  return (
    // TODO: Use a % + max-width to limit growth on big screens
    <Container
      variant="rightPart"
      w="50%"
      h="93vh"
      overflow="scroll"
      pos="sticky"
      top="65px"
    >
      <Box p={1} d="flex" w="100%" justifyContent="space-between">
        <Tooltip label="Fermer">
          <Button onClick={onClose}>🚪</Button>
        </Tooltip>
        <Box>
          <Tooltip label="Editer">
            <Button onClick={nyi}>✏️</Button>
          </Tooltip>
          <Tooltip label="Supprimer">
            <Button onClick={nyi}>☠️</Button>
          </Tooltip>
        </Box>
      </Box>

      <Box p={5} textAlign="left">
        {stepsLeft > 0 && (
          <Text variant="xs" textAlign="left" color="red">
            Il reste {stepsLeft} étapes à finaliser.
          </Text>
        )}

        <Text variant="titleParaLight" mt={4} textAlign="left">
          {title}
        </Text>

        <Text variant="smallTitle" textAlign="left">
          {description}
        </Text>

        <Text variant="xs" mb={5} textAlign="left" color="brand.gray.200">
          Enquête mise en ligne le {date.toLocaleDateString()}.
        </Text>

        <a href={exportURL} download>
          <Button variant="roundedTransparent" size="xs" p={2}>
            CSV ⇣
          </Button>
        </a>
      </Box>

      <Box mt={4}>
        <Flex>
          <ActionButton
            top
            right
            label={"Modifier la page d'accueil"}
            onClick={gotToLanding}
          />
          <ActionButton
            top
            right
            label={"Modifier le questionnaire"}
            onClick={goToForm}
          />
          <ActionButton
            top
            label={"Modifier le consentement"}
            onClick={goToConsent}
          />
          <ActionButton
            top
            left
            label={"Modifier les données de l'enquête"}
            onClick={goToSurveyMetadatas}
          />
        </Flex>
        <Flex>
          <ActionButton top right bottom label={"Dupliquer"} onClick={nyi} />
          <ActionButton top right bottom label={"Archiver"} onClick={nyi} />
          <ActionButton
            top
            bottom
            label={"Archiver & Dupliquer"}
            onClick={nyi}
          />
        </Flex>
      </Box>

      <Box mt={10}>
        <Text variant="baseline" textAlign="center" mb={8}>
          Statistiques
        </Text>

        <Filters
          filters={filters}
          handleClick={setStatFilter}
          currentFilter={statFilter}
          center
        />

        <Flex mt={5} ml={50} mr={50} justifyContent="space-between">
          <BigNumber value={selectedStats.visits} label={"visites"} />
          <BigNumber value={selectedStats.consented} label={"consentis"} />
          <BigNumber value={selectedStats.completed} label={"terminés"} />
        </Flex>

        <Flex
          mt={55}
          ml={50}
          mr={50}
          flexDirection="column"
          alignItems="flex-start"
        >
          <div>Progression de la complétion</div>
          <Tooltip label={"Bibou !"}>
            <div>📈</div>
          </Tooltip>
        </Flex>
      </Box>
    </Container>
  );
};

// ---- HOOKS

function useSurveyData(surveyId: string) {
  const { data, isLoading } = useGetSurveyStats(surveyId);
  const exportURL = `${API_URL_ROOT}/surveys/${surveyId}/export`;

  // TODO: compute this ?
  const stepsLeft = 2;

  return {
    title: data?.surveyStats?.title,
    description: data?.surveyStats?.description,
    date: new Date(
      data?.surveyStats?.publishedAt ?? data?.surveyStats?.createdAt
    ),
    stepsLeft,
    statistics: data?.surveyStats?.statistics,
    exportURL,
    isLoading,
  };
}

// ---- SUB COMPONENTS

// -- Big Numbers

interface BigNumberProps {
  value: number;
  label: string;
}

const BigNumber = ({ value, label }: BigNumberProps) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Text variant="statsDashboard">{value}</Text>
      <Text variant="currentLight">{label}</Text>
    </Flex>
  );
};

// -- Actions

interface ActionButtonProps {
  label: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  onClick?: () => void;
}

const borderStyle = "1px solid";

const ActionButton = ({
  top,
  right,
  bottom,
  left,
  label,
  onClick,
}: ActionButtonProps) => {
  const borders = {
    borderTop: top ? borderStyle : undefined,
    borderBottom: bottom ? borderStyle : undefined,
    borderLeft: left ? borderStyle : undefined,
    borderRight: right ? borderStyle : undefined,
  };

  return (
    <Box
      p={3}
      w="calc(100% / 3)"
      {...borders}
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Text variant="xs">{label}</Text>
    </Box>
  );
};

// ---- HELPERS

// Good job reading up until here, you found the goodies :D

const nyiMsg = [
  "Not yet implemented... 🚧",
  "Come back later... 🏗",
  "Come on, we are not done yet ! 👷‍♂️",
  "Man... just give us room to build this ! 🧱",
];

function nyi() {
  alert(nyiMsg[Math.floor(Math.random() * nyiMsg.length)]);
}
