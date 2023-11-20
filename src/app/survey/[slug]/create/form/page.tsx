'use client'

import { useEffect, useRef } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { selectors as appSelectors } from "@/redux/slices/application/index.js"
import InputsPreview from "@/components/CreateSurvey/CreateForm/InputsPreview/index.tsx"
import Drawer from "@/components/Drawer/index.tsx"
import InputForm from "@/components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/index.tsx"
import PageBuilder from "@/components/CreateSurvey/CreateForm/PageBuilder/index.tsx"
import { useAppSelector } from "@/redux/hooks/index.js"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import Menu from "@/components/Menu/CreateForm/index.tsx"
import RightPart from "@/components/Layout/RightPart/index.tsx"
import Error from "@/components/Error/index.tsx"
import Banner from "@/components/Banner/index.tsx"
import Loader from "@/components/Spinner/index.tsx"
import ConditionMenu from "@/components/CreateSurvey/CreateForm/Condition/ConditionMenu/index.tsx"

// ---- TYPES

type Props = {
  params: {
    slug: string;
  }
}

// ---- COMPONENT

export default function CreateForm({ params }: Props): JSX.Element {
  const { slug } = params
  const dispatch = useDispatch()

  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const selectedSurvey = useAppSelector(selectors.survey.getSelectedSurvey);
  const selectedSurveyId = useAppSelector(selectors.survey.getSelectedSurveyId);
  const isLoading = useAppSelector(selectors.survey.isLoading);
  const order = useAppSelector(selectors.survey.getOrder);
  const error = useAppSelector(selectors.survey.error);
  // const isCreating = useAppSelector(selectors.questions.isCreating);
  const drawerIsOpen = useAppSelector(appSelectors.drawerIsOpen);
  const selectedCondition = useAppSelector(selectors.conditions.selectSelectedCondition);
  const containerRef = useRef<HTMLDivElement>(null);
  // const conditionId = useAppSelector(selectors.conditions.getSelectedConditionId);

  // WORK IN PROGRESS
  // const conditions = useAppSelector((state) => selectors.conditions.selectById(state, conditionId));

  useEffect(() => {
    dispatch(actions.initializeSurvey(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (drawerIsOpen) {
      setTimeout(() => {
        containerRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }, 500);
    }
  }, [drawerIsOpen]);
  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer isOpen={isOpen} size="md" content={<InputForm order={order} />} />
      
      <Box display="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="47%">
          <Menu surveyId={selectedSurveyId} />

          <Box display="flex" overflow="hidden" w="100%">
            <Container variant="createformColumn" h="calc(100vh - 65px)" w="6%" minW="100px" borderRight="1px" borderColor="gray.200">
              <PageBuilder survey={selectedSurvey} />
            </Container>

            <Container
              className="flex flex-col justify-center items-center bg-slate-100 overflow-auto p-0 relative"
              h="calc(100vh - 65px)"
              w="94%"
              maxWidth="unset"
              minWidth="unset"
            >
              <Banner />

              {selectedCondition !== undefined ? (
                <ConditionMenu selectedCondition={selectedCondition} />
              ) : (
                <div className="w-full h-full">
                  <InputsPreview order={order} surveyId={selectedSurveyId} />
                  <Box pb="20px" ref={containerRef} />
                </div>
              )}
            </Container>
          </Box>
        </Box>

        <RightPart selectedCondition={selectedCondition} />
      </Box>
    </Box>
  );
};
