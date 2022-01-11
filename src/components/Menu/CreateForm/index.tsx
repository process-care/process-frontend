import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Collapse,
  CircularProgress,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ReactComponent as Back } from "./assets/back.svg";
import { t } from "static/input";
import { actions as appActions } from "redux/slices/application";
import { Loader } from "components/Spinner";
import { useGetSurvey } from "call/actions/survey";
import { actions as globalActions } from "redux/slices/scientistData";
import { CheckIcon } from "@chakra-ui/icons";
import { selectors } from "redux/slices/landing-editor";
import { selectors as globalSelectors } from "redux/slices/scientistData";

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

export const Menu: React.FC<Props> = ({ isLanding, surveyId }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetSurvey(surveyId);
  const { previewMode } = useAppSelector((state) => state.application);
  const { inProgress, done } = useChangesNotifier(isLanding);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
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
          right="10px"
          variant="roundedBlue"
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
          justifyContent="flex-start"
          alignItems="center"
        >
          <NavLink to="/dashboard">
            <Flex ml="50px" alignItems="center">
              <Back />
              <Text fontSize="12px" ml={2} mr="30px">
                {nl.button.dashboard}
              </Text>
            </Flex>
          </NavLink>

          <Text
            fontSize="12px"
            textTransform="uppercase"
            isTruncated
            maxWidth="250px"
          >
            {data?.survey?.title}
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
    isLanding
      ? selectors.landingHasChanges
      : globalSelectors.questions.questionsHasChanges
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
      setTimeout(() => setDone(false), 2000);
    }
  }, [hasUnsavedChanges, inProgress, done]);

  return {
    inProgress,
    done,
  };
}
