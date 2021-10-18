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

import { actions, selectors } from "redux/slices/global";

import { Loader } from "components/Spinner";

export const CreateForm: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const selectedSurvey = useAppSelector(selectors.survey.getSelectedSurvey);
  const selectedSurveyId = useAppSelector(selectors.survey.getSelectedSurveyId);
  const isLoading = useAppSelector(selectors.survey.isLoading);
  const order = useAppSelector(selectors.survey.getOrder);
  const error = useAppSelector(selectors.survey.error);

  const selectedCondition = useAppSelector(
    selectors.conditions.getSelectedCondition
  );

  useEffect(() => {
    dispatch(actions.initializeSurvey(slug));
  }, [slug]);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer isOpen={isOpen} size="md" content={<InputForm order={order} />} />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu surveyId={selectedSurveyId} />
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
