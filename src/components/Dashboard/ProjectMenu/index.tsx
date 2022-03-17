import React, { useMemo, useState } from "react";

import { Box, Button, Container, Flex, Tooltip, Text } from "@chakra-ui/react";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";

import { API_URL_ROOT } from "constants/api";
import { Filters } from "../Filters";

import { useNavigator } from "components/CreateSurvey/hooks";
import { RemovingConfirmation } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/Status";
// import { Chart } from "../Chart";
import { renderStatus } from "utils/application/renderStatus";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";
import { actions, selectors } from "redux/slices/scientistData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/hooks";
import { SURVEY_STATUS } from "types/survey";
import { useGetSurveyStatsQuery } from "api/graphql/queries/survey.gql.generated";
import { client } from "api/gql-client";
import { SurveyRedux } from "redux/slices/types";
import { Enum_Survey_Status } from "api/graphql/types.generated";

// ---- STATICS

const filters = [
  { label: "24 h", id: "day" },
  { label: "7 jours", id: "week" },
  { label: "1 mois", id: "month" },
  { label: "6 mois", id: "semester" },
  { label: "1 an", id: "year" },
  { label: "Max", id: "all" },
];
export const enum Filter {
  Day = "day",
  Week = "week",
  Month = "month",
  Semester = "semester",
  Year = "year",
  All = "all",
}

// ---- TYPES

interface Props {
  menuIsOpen: boolean;
  onClose: () => void;
}

// ---- COMPONENT

export const ProjectMenu: React.FC<Props> = ({ menuIsOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const selectedSurvey = useAppSelector(selectors.mySurveys.getSelectedSurvey);

  const {
    title,
    description,
    date,
    // stepsLeft,
    statistics,
    exportURL,
    isLoadingStats,
  } = useSurveyData(selectedSurvey?.id);

  const { gotToLanding, goToForm, goToConsent, goToSurveyMetadatas } = useNavigator(selectedSurvey);
  const { isDraft, isArchived, hadLanding, hadQuestion, canPublish } = useWarning(selectedSurvey);

  const [statFilter, setStatFilter] = useState<Filter>(Filter.Day);

  // We should be doing that much better :/
  if (isLoadingStats) {
    return (
      <Container variant="rightPart" h="93vh" overflow="scroll" pos="sticky" top="65px">
        <Loader />
      </Container>
    );
  }

  // FIXME: Why is it an array ?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!menuIsOpen || !selectedSurvey || selectedSurvey.length < 1) {
    return <></>;
  }

  // TODO: Wait for redux type : statFilter wich is filter[0].id have to be type with statistic key from api
  const selectedStats = statistics && statistics[statFilter];

  const handleTrash = () => {
    setIsRemoving(true);
  };

  const handleDelete = () => {
    dispatch(actions.deleteSurvey(selectedSurvey.id));
    onClose();
  };

  const changeStatus = (status: SurveyRedux["attributes"]["status"]) => {
    if (!selectedSurvey.id) return;
    dispatch(
      actions.updateSurveys({
        id: selectedSurvey.id,
        changes: {
          id: selectedSurvey.id,
          attributes: {
            slug: selectedSurvey.attributes.slug,
            status,
          },
        },
      })
    );
  };

  const handleArchive = () => {
    changeStatus(Enum_Survey_Status.Archived);
  };

  const handlePublish = () => {
    changeStatus(Enum_Survey_Status.Pending);
  };

  return (
    // TODO: Use a % + max-width to limit growth on big screens
    <Container variant="rightPart" w="53%" h="93vh" overflow="scroll" pos="sticky" top="65px">
      {isRemoving ? (
        <RemovingConfirmation
          confirm={handleDelete}
          close={() => setIsRemoving(false)}
          content={`Voulez-vous vraiment supprimer le projet"${selectedSurvey?.attributes.title}" ?`}
        />
      ) : (
        <Box>
          <Box p={1} d="flex" w="100%" justifyContent="space-between">
            <Tooltip label="Fermer">
              <Button onClick={onClose} variant="link">
                <Close />
              </Button>
            </Tooltip>
            <Box>
              <Tooltip label="Supprimer le projet">
                <Button onClick={handleTrash} variant="link">
                  <Trash />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box p={5} textAlign="left">
            {/* {stepsLeft > 0 && (
              <Text variant="xs" textAlign="left" color="red">
                Il reste {stepsLeft} étapes à finaliser.
              </Text>
            )} */}
            <Tooltip label={"Voir la page d'accueil"} placement="top-start">
              <NavLink to={`/survey/${selectedSurvey.id}`}>
                <Text variant="titleParaLight" mt={4} textAlign="left">
                  {title}
                </Text>

                <Text variant="smallTitle" textAlign="left">
                  {description}
                </Text>

                <Text variant="xs" mb={5} textAlign="left" color="brand.gray.200">
                  Enquête mise en ligne le {date.toLocaleDateString()}.
                </Text>
              </NavLink>
            </Tooltip>
            <Flex justifyContent="space-between" alignItems="center">
              {isDraft ? (
                <Button disabled={!canPublish} variant="roundedBlue" onClick={handlePublish}>
                  Publier
                </Button>
              ) : (
                <Text variant="xs">Etat : {renderStatus(selectedSurvey?.attributes.status)}</Text>
              )}
              <Tooltip label={"Exporter les données"} placement="top-start">
                <a href={exportURL} download>
                  <Button variant="roundedTransparent" size="xs" p={2}>
                    CSV ⇣
                  </Button>
                </a>
              </Tooltip>
            </Flex>
          </Box>
          {isDraft && <Warning hadLanding={hadLanding} hadQuestion={hadQuestion} />}
          <Box mt={4}>
            <Flex>
              <ActionButton
                top
                right
                label={` ${hadLanding ? "Modifier" : "Créer"} la page d'accueil`}
                onClick={isArchived ? () => console.log("forbidden") : gotToLanding}
                disabled={isArchived}
              />
              <ActionButton
                top
                right
                disabled={!isDraft}
                label={` ${hadQuestion ? "Modifier" : "Créer"} le formulaire`}
                onClick={!isDraft ? () => console.log("forbidden") : goToForm}
              />
              <ActionButton
                top
                disabled={!isDraft}
                label={"Modifier le consentement"}
                onClick={!isDraft ? () => console.log("forbidden") : goToConsent}
              />
              <ActionButton
                disabled={!isDraft}
                top
                left
                label={"Modifier les données du projet"}
                onClick={!isDraft ? () => console.log("forbidden") : goToSurveyMetadatas}
              />
            </Flex>
            <Flex>
              <ActionButton
                top
                right
                bottom
                label={"Archiver"}
                onClick={isArchived ? () => console.log("forbidden") : handleArchive}
                disabled={isArchived}
              />
              <ActionButton disabled top right bottom label={"Dupliquer"} onClick={() => console.log("forbiden")} />

              <ActionButton
                disabled
                top
                bottom
                label={"Archiver & Dupliquer"}
                onClick={() => console.log("forbiden")}
              />
            </Flex>
          </Box>

          <Box mt={10} mb={20}>
            <Text variant="baseline" textAlign="center" mb={8}>
              Statistiques
            </Text>

            <Filters filters={filters} handleClick={setStatFilter} currentFilter={statFilter} center />

            <Flex mt={5} ml={50} mr={50} justifyContent="space-around">
              <BigNumber value={selectedStats?.consented} label={"consentis"} />
              <BigNumber value={selectedStats?.completed} label={"terminés"} />
            </Flex>

            {/* <Flex
              mt={55}
              ml={50}
              mr={50}
              flexDirection="column"
              alignItems="flex-start"
            >
              <div>Progression de la complétion</div>
              <Chart />
            </Flex> */}
          </Box>
        </Box>
      )}
    </Container>
  );
};

// ---- HOOKS

function useSurveyData(surveyId: string | undefined) {
  const { data, isLoading } = useGetSurveyStatsQuery(client, {
    id: surveyId ?? "",
  });

  // TODO: It seems REST routes have changed in Strapi v4 (need the leading `/api`)
  // Maybe it should be embeded into the CONST, but the base root may be needed elsewhere
  // Maybe do a special CONST for REST routes ?
  const exportURL = `${API_URL_ROOT}/api/surveys/${surveyId}/export`;

  // TODO: compute this ?
  const stepsLeft = 2;

  return {
    title: data?.surveyStats?.title,
    description: data?.surveyStats?.description,
    date: new Date(data?.surveyStats?.publishedAt ?? data?.surveyStats?.createdAt),
    stepsLeft,
    statistics: data?.surveyStats?.statistics,
    exportURL,
    isLoadingStats: isLoading,
  };
}

function useWarning(selectedSurvey: SurveyRedux | undefined) {
  const isDraft = selectedSurvey?.attributes?.status === SURVEY_STATUS.Draft;
  const isArchived = selectedSurvey?.attributes?.status === SURVEY_STATUS.Archived;

  const hadLanding = selectedSurvey?.attributes?.landing?.data !== null;
  const hadQuestion = selectedSurvey && selectedSurvey?.attributes?.order?.length > 0;
  const canPublish = isDraft && hadLanding && hadQuestion;

  return {
    isDraft,
    isArchived,
    hadLanding,
    hadQuestion,
    canPublish,
  };
}

// ---- SUB COMPONENTS

// -- Big Numbers

interface BigNumberProps {
  value: number | undefined;
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

//  -- Warning

const Warning = ({ hadLanding, hadQuestion }: { hadLanding: boolean; hadQuestion: boolean | undefined }) => {
  const Message = ({ content }: { content: string }) => {
    return (
      <Box pl={5} d="flex" alignContent="flex-start">
        <Text variant="current">⚠️ {content}</Text>
      </Box>
    );
  };
  return (
    <Box>
      {!hadLanding && <Message content="Le projet n'a pas de page d'accueil" />}
      {!hadQuestion && <Message content="Le formulaire est vide" />}
    </Box>
  );
};

// -- Actions

interface ActionButtonProps {
  disabled?: boolean;
  label: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  onClick?: () => void;
}

const borderStyle = "1px solid";
const disabledStyle = { opacity: 0.3 };

const ActionButton = ({ disabled, top, right, bottom, left, label, onClick }: ActionButtonProps) => {
  const borders = {
    borderTop: top ? borderStyle : undefined,
    borderBottom: bottom ? borderStyle : undefined,
    borderLeft: left ? borderStyle : undefined,
    borderRight: right ? borderStyle : undefined,
  };

  const hoverStyle = useMemo(() => {
    return disabled ? { cursor: "not-allowed" } : { cursor: "pointer" };
  }, [disabled]);

  return (
    <Box
      p={3}
      w="calc(100% / 3)"
      {...borders}
      _hover={hoverStyle}
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={disabled ? { ...disabledStyle } : {}}
    >
      <Text variant="xs">{label}</Text>
    </Box>
  );
};
