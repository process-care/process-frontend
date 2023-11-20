import { useState, useEffect } from "react"
import { Flex, Text, Button, Collapse, CircularProgress } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { StepBackIcon } from "lucide-react"
import Link from "next/link.js"

import { t } from "@/static/input.js"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { actions as appActions } from "@/redux/slices/application/index.js"
import { actions as globalActions } from "@/redux/slices/scientistData.js"
import { selectors } from "@/redux/slices/landing-editor.js"
import { selectors as globalSelectors } from "@/redux/slices/scientistData.js"
import { useSurveyQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { client } from "@/api/gql-client.js"
import Loader from "@/components/Spinner/index.tsx"

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
          <Link className="hover:text-process-blue" href="/dashboard">
            <Flex alignItems="center">
              <StepBackIcon />
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
    <div className="flex flex-row mr-10 text-process-blue relative items-center">
      <CircularProgress mr={2} isIndeterminate color="brand.blue" size="3" />
      <Text variant="xs">{nl.msg.hasChanges}</Text>
    </div>
  )
}

function ChangesSaved() {
  return (
    <div className="flex flex-row mr-10 text-process-green relative items-center">
      <CheckIcon mr="7px" scale={3} />
      <Text variant="xs">{nl.msg.changesSaved}</Text>
    </div>
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
