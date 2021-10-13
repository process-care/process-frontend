import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import InputsPreview from "components/CreateSurvey/CreateForm/InputsPreview";
import IRoute from "types/routes/route";
import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/CreateForm/PageBuilder";
import { Menu } from "components/Menu/CreateForm";

import { useAppSelector } from "redux/hooks";

import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";
import { Error } from "components/Error";
import { Banner } from "components/Banner";
import { useDispatch } from "react-redux";
import {
  actions as actionsPage,
  selectors as selectorsPage,
} from "redux/slices/formEditor/page-editor";
import { selectors as selectorsMySurveys } from "redux/slices/my-surveys";
import { selectors as conditionSelectors } from "redux/slices/formEditor/condition-editor";
import {
  selectors as selectorSurvey,
  actions as actionsSurvey,
} from "redux/slices/formEditor/selected-survey";
import {
  actions as actionsQuestion,
  selectors as selectorsQuestion,
} from "redux/slices/formEditor/question-editor";
import { actions as actionsCondition } from "redux/slices/formEditor/condition-editor";

// import { Loader } from "components/Spinner";

export const CreateForm: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const selectedSurvey = useAppSelector(selectorSurvey.getSelectedSurvey);
  const selectedSurveyId = useAppSelector(selectorSurvey.getSelectedSurveyId);
  const pages = useAppSelector(selectorsPage.getAllPages);
  const questions = useAppSelector(selectorsQuestion.getSelectedPageQuestions);
  const isLoadingQuestion = useAppSelector(selectorsQuestion.isLoading);
  const isLoadingPage = useAppSelector(selectorsPage.isLoading);

  const order = useAppSelector(selectorSurvey.getOrder);
  const questionsIds = questions.map((q) => q.id);
  const pagesIds = pages.map((p) => p.id);

  const error = useAppSelector(selectorsMySurveys.error);
  const selectedCondition = useAppSelector(
    conditionSelectors.getSelectedCondition
  );
  useEffect(() => {
    dispatch(actionsSurvey.initialize(slug));
    dispatch(actionsPage.initialize(slug));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoadingPage) {
      dispatch(actionsQuestion.initialize(pagesIds));
    }
  }, [isLoadingPage]);

  useEffect(() => {
    if (!isLoadingQuestion) {
      dispatch(
        actionsCondition.initialize({
          questionsIds: questionsIds,
          pagesIds: pagesIds,
        })
      );
    }
  }, [isLoadingQuestion]);

  if (error) {
    return <Error error={error} />;
  }

  // if (isLoadingQuestion) {
  //   return <Loader />;
  // }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer isOpen={isOpen} size="md" content={<InputForm order={order} />} />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu surveyId={selectedSurvey.id} />
          <Banner />
          <Box
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%"
          >
            <Container
              variant="createformColumn"
              w="6%"
              minW="100px"
              borderRight="1px"
              borderColor="gray.200"
            >
              <PageBuilder survey={selectedSurvey} />
            </Container>

            <Container
              variant="createformColumn"
              w="94%"
              alignItems="center"
              p="0"
            >
              <div className="background__grid">
                {selectedCondition !== undefined ? (
                  <ConditionPreview selectedCondition={selectedCondition} />
                ) : (
                  <InputsPreview order={order} surveyId={selectedSurveyId} />
                )}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart selectedCondition={selectedCondition} />
      </Box>
    </Box>
  );
};
