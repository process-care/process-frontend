import { useState, useEffect } from "react";
import { Flex, Text, Button, Collapse, CircularProgress } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";

import { t } from "@/static/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions as appActions } from "@/redux/slices/application";
import { actions as globalActions } from "@/redux/slices/scientistData";
import { selectors } from "@/redux/slices/landing-editor";
import { selectors as globalSelectors } from "@/redux/slices/scientistData";
import { useSurveyQuery } from "@/api/graphql/queries/survey.gql.generated";
import { client } from "@/api/gql-client";
import Loader from "@/components/Spinner";

import Back from "./assets/back.svg";

// ---- STATIC

const nl = {
  button: {
    leavePreview: "Sortir de la previsualisation",
    dashboard: "Dashboard",
  },
  msg: {
    hasChanges: "Sauvegarde en cours ...",
    changesSaved: "Sauvegardé !",
  },
};

// ---- COMPONENT

interface Props {
  isLanding?: boolean;
  surveyId: string;
}

export default function Menu({ isLanding, surveyId }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useSurveyQuery(client, { id: surveyId });
  const { previewMode } = useAppSelector((state) => state.application);
  const { inProgress, done } = useChangesNotifier(isLanding);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Une erreur est survenue</p>;
  }

  const handleVerify = () => {
    dispatch(globalActions.checkSurvey(true));
  };

  return (
    <>
      {previewMode === "landing" && (
        <Button
          pos="absolute"
          top="19px"
          right="0"
          left="0"
          m="0 auto"
          variant="roundedBlue"
          width="fit-content"
          onClick={() =>
            dispatch(
              appActions.tooglePreview({
                previewMode: null,
              })
            )
          }
        >
          {nl.button.leavePreview}
        </Button>
      )}

      <Collapse in={previewMode !== "landing"}>
        <Flex
          pos="relative"
          p={5}
          borderBottom="1px"
          borderColor="brand.line"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Link href="/dashboard">
            <Flex ml="50px" alignItems="center">
              <Image src={Back} alt="Back" />
              <Text fontSize="12px" ml={2} mr="30px">
                {nl.button.dashboard}
              </Text>
            </Flex>
          </Link>

          <Text fontSize="12px" textTransform="uppercase" isTruncated maxWidth="250px">
            {data?.survey?.data?.attributes?.title}
          </Text>
          <Flex pos="absolute" right="10px">
            {inProgress && <ChangesInProgress />}
            {done && <ChangesSaved />}
            {isLanding ? (
              <Button
                variant="roundedBlue"
                mr={5}
                onClick={() =>
                  dispatch(
                    appActions.tooglePreview({
                      previewMode: "landing",
                    })
                  )
                }
              >
                {t.preview}
              </Button>
            ) : (
              <Flex alignItems="center">
                <Button variant="roundedBlue" mr={5} onClick={handleVerify}>
                  {t.verify}
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Collapse>
    </>
  );
};

// ---- SUB COMPONENTS

function ChangesInProgress() {
  return (
    <Text variant="xs" mr="40px" color="brand.blue" top="10px" pos="relative">
      <CircularProgress mr={2} isIndeterminate color="brand.blue" size="2" />
      {nl.msg.hasChanges}
    </Text>
  );
}

function ChangesSaved() {
  return (
    <Text variant="xs" mr="40px" color="brand.green" top="10px" pos="relative">
      <CheckIcon mr="7px" />
      {nl.msg.changesSaved}
    </Text>
  );
}

// ---- HOOKS

// TODO: make it global
function useChangesNotifier(isLanding: boolean | undefined) {
  const hasUnsavedChanges = useAppSelector(
    isLanding ? selectors.landingHasChanges : globalSelectors.questions.questionsHasChanges
  );

  const [inProgress, setInProgress] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // If changes and nothing else -> progress on
    if (hasUnsavedChanges && !inProgress) {
      setInProgress(true);
      setDone(false);
    }

    // If progress and no more changes -> done
    if (!hasUnsavedChanges && inProgress && !done) {
      setInProgress(false);
      setDone(true);
    }

    // If nothing else but done -> turn off after a while
    if (!hasUnsavedChanges && !inProgress && done) {
      setTimeout(() => setDone(false), 1000);
    }
  }, [hasUnsavedChanges, inProgress, done]);

  return {
    inProgress,
    done,
  };
}
