import { useCallback, useMemo, useState } from "react";
import { Box, Button, Container, Flex, Tooltip, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Link from "next/link.js"

import { API_URL_ROOT } from "@/constants/api.ts"
import { useNavigator } from "@/components/CreateSurvey/hooks/index.tsx"
// import { Chart } from "../Chart";
import { renderStatus } from "@/utils/application/renderStatus.tsx"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { useAppSelector } from "@/redux/hooks/index.js"
import { SURVEY_STATUS } from "@/types/survey.js"
import { useGetSurveyStatsQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { client } from "@/api/gql-client.js"
import { SurveyRedux } from "@/redux/slices/types/index.js"
import { Enum_Survey_Status } from "@/api/graphql/types.generated.ts"
import Loader from "@/components/Spinner/index.tsx"
import RemovingConfirmation from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/Status/index.tsx"
import Filters from "../Filters/index.tsx"
import { Icons } from "@/components/icons.tsx"

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

export default function ProjectMenu({ menuIsOpen, onClose }: Props): JSX.Element {
  const dispatch = useDispatch()

  const [isRemoving, setIsRemoving] = useState(false)
  const [statFilter, setStatFilter] = useState<Filter>(Filter.Day)

  const selectedSurvey = useAppSelector(selectors.mySurveys.getSelectedSurvey)

  // Get survey data
  const {
    title,
    description,
    date,
    // stepsLeft,
    statistics,
    exportURL,
    isLoadingStats,
  } = useSurveyData(selectedSurvey?.id)

  const { gotToLanding, goToForm, goToConsent, goToSurveyMetadatas } = useNavigator(selectedSurvey)
  const { isDraft, isArchived, hadLanding, hadQuestion, canPublish } = useWarning(selectedSurvey)

  // TODO: Wait for redux type : statFilter wich is filter[0].id have to be type with statistic key from api
  const selectedStats = statistics && statistics[statFilter];

  const changeStatus = (status: SurveyRedux["attributes"]["status"]) => {
    if (!selectedSurvey?.id) return

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
    )
  }

  // Various action handles
  const signalForbidenAction = useCallback(() => console.info("Forbidden action."), [])
  const handleArchive = () => { changeStatus(Enum_Survey_Status.Archived) }
  const handlePublish = () => { changeStatus(Enum_Survey_Status.Pending) }
  const handleTrash = useCallback(() => { setIsRemoving(true) }, [])
  const handleDelete = () => {
    if (!selectedSurvey?.id) return
    dispatch(actions.deleteSurvey(selectedSurvey.id))
    onClose()
  };

  // We should be doing that much better :/
  if (isLoadingStats) {
    return (
      <Container variant="rightPart" overflow="auto" pos="sticky" top="65px">
        <Loader />
      </Container>
    );
  }

  // FIXME: Why is it an array ?
  // @ts-ignore
  if (!menuIsOpen || !selectedSurvey || selectedSurvey.length < 1) {
    return <></>
  }
  
  return (
    // TODO: Use a % + max-width to limit growth on big screens
    <Container variant="rightPart" w="53%" overflow="auto" pos="sticky" top="65px">
      {isRemoving ? (
        <RemovingConfirmation
          confirm={handleDelete}
          close={() => setIsRemoving(false)}
          content={`Voulez-vous vraiment supprimer le projet"${selectedSurvey?.attributes.title}" ?`}
        />
      ) : (
        <Box>
          <Box p={1} display="flex" w="100%" justifyContent="space-between">
            <Tooltip label="Fermer">
              <Button onClick={onClose} variant="link">
                <Icons.close />
              </Button>
            </Tooltip>
            <Box>
              <Tooltip label="Supprimer le projet">
                <Button onClick={handleTrash} variant="link">
                  <Icons.delete />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box p={5} textAlign="left">
            <Tooltip label={"Voir la page d'accueil"} placement="top-start">
              <Link href={`/survey/${selectedSurvey.attributes.slug}`}>
                <Text variant="titleParaLight" mt={4} textAlign="left">
                  {title}
                </Text>

                <Text variant="smallTitle" textAlign="left">
                  {description}
                </Text>

                <Text variant="xs" mb={5} textAlign="left" color="brand.gray.200">
                  Enquête mise en ligne le {date.toLocaleDateString()}.
                </Text>
              </Link>
            </Tooltip>
            <Flex justifyContent="space-between" alignItems="center">
              {isDraft ? (
                <Button disabled={!canPublish} variant="roundedBlue" onClick={handlePublish}>
                  Publier
                </Button>
              ) : (
                <Text variant="xs">
                  Etat : <strong>{renderStatus(selectedSurvey?.attributes.status)}</strong>
                </Text>
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
                onClick={isArchived ? signalForbidenAction : gotToLanding}
                disabled={isArchived}
              />
              <ActionButton
                top
                right
                disabled={!isDraft}
                label={` ${hadQuestion ? "Modifier" : "Créer"} le formulaire`}
                onClick={!isDraft ? signalForbidenAction : goToForm}
              />
              <ActionButton
                top
                disabled={!isDraft}
                label={"Modifier le consentement"}
                onClick={!isDraft ? signalForbidenAction : goToConsent}
              />
              <ActionButton
                disabled={!isDraft}
                top
                left
                label={"Modifier les données du projet"}
                onClick={!isDraft ? signalForbidenAction : goToSurveyMetadatas}
              />
            </Flex>
            <Flex>
              <ActionButton
                top
                right
                bottom
                label={"Archiver"}
                onClick={isArchived ? signalForbidenAction : handleArchive}
                disabled={isArchived}
              />
              <ActionButton disabled top right bottom label={"Dupliquer"} onClick={signalForbidenAction} />

              <ActionButton
                disabled
                top
                bottom
                label={"Archiver & Dupliquer"}
                onClick={signalForbidenAction}
              />
            </Flex>
          </Box>

          <Box border="1px solid #F7F7F7F7" p="5" backgroundColor="#fdfdfdf1" w="80%" m="30px auto">
            <Text variant="baseline" textAlign="center" mb={8}>
              Statistiques
            </Text>

            <Box display="flex" justifyContent="center">
              <Filters filters={filters} handleClick={setStatFilter} currentFilter={statFilter} center />
            </Box>
            <Flex mt={5} ml={50} mr={50} justifyContent="space-around">
              <BigNumber value={selectedStats?.consented} label={"consentis"} />
              <BigNumber value={selectedStats?.completed} label={"terminés"} />
            </Flex>
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
      <Box pl={5} display="flex" alignContent="flex-start">
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
