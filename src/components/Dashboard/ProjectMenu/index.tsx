import React, { useCallback, useState } from "react";

import { Box, Button, Container, Flex, Tooltip, Text } from "@chakra-ui/react";
import { API_URL_ROOT } from "constants/api";
import { Filters } from "../Filters";
import { useHistory } from "react-router-dom";

// ---- STATICS

const filters = [
  { label: "24 h", id: "24h" },
  { label: "7 jours", id: "7d" },
  { label: "1 mois", id: "1m" },
  { label: "6 mois", id: "6m" },
  { label: "1 an", id: "1y" },
  { label: "Max", id: "all" },
];

// ---- TYPES

interface Props {
  isOpen: boolean;
  surveyId?: string;
  onClose: () => void;
}

// ---- COMPONENT

export const ProjectMenu: React.FC<Props> = ({ isOpen, surveyId, onClose }) => {
  if (!isOpen || !surveyId) return <></>;

  const { title, description, date, stepsLeft, stats, exportURL } =
    useSurveyData(surveyId);
  const { goToLanding, goToForm, goToConsent } = useNavigator(surveyId);

  const [statFilter, setStatFilter] = useState(filters[0].id);
  const selectedStats = stats[statFilter];

  return (
    // TODO: Use a % + max-width to limit growth on big screens
    <Container variant="rightPart" w="50%">
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
            label={"Voir la page d'accueil"}
            onClick={goToLanding}
          />
          <ActionButton
            top
            right
            label={"Voir le questionnaire"}
            onClick={goToForm}
          />
          <ActionButton
            top
            label={"Voir le consentement"}
            onClick={goToConsent}
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

// TODO: Query backend for accurate data
function useSurveyData(surveyId: string) {
  const exportURL = `${API_URL_ROOT}/surveys/${surveyId}/export`;

  const title = "Test";
  const description = "Lotem ipsum and then some.";
  const date = new Date();

  const stats: Record<
    string,
    { visits: number; consented: number; completed: number }
  > = {
    "24h": { visits: 22, consented: 3, completed: 2 },
    "7d": { visits: 80, consented: 13, completed: 10 },
    "1m": { visits: 153, consented: 27, completed: 25 },
    "6m": { visits: 612, consented: 88, completed: 84 },
    "1y": { visits: 1087, consented: 141, completed: 138 },
    all: { visits: 1900, consented: 209, completed: 203 },
  };

  const stepsLeft = 2;

  return {
    title,
    description,
    date,
    stepsLeft,
    stats,
    exportURL,
  };
}

function useNavigator(surveyId: string) {
  const history = useHistory();

  // Take you to the landing editor
  const goToLanding = useCallback(() => {
    history.push(`/create-survey/${surveyId}/create-landing`);
  }, [surveyId]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/create-survey/${surveyId}/create-form`);
  }, [surveyId]);

  // TODO: Is this really a thing ? Is it supposed to show the uploaded consent file ?
  const goToConsent = useCallback(nyi, [surveyId]);

  return {
    goToLanding,
    goToForm,
    goToConsent,
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
