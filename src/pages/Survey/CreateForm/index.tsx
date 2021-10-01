import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import InputsPreview from "components/CreateSurvey/CreateForm/InputsPreview";

import IRoute from "types/routes/route";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/CreateForm/PageBuilder";

import { useAppSelector } from "redux/hooks";

import { Menu } from "components/Menu/CreateForm";

import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { useGetSurveyBySlug } from "call/actions/survey";
import { Banner } from "components/Banner";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/page-editor";

export const CreateForm: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug } = useParams();
  const { data: survey, isLoading, error } = useGetSurveyBySlug(slug);
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const { selected_condition } = useAppSelector((state) => state.formBuilder);

  useEffect(() => {
    if (survey) dispatch(actions.initialize(survey.id));
  }, [slug, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!survey) {
    return <div>No Survey</div>;
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer
        isOpen={isOpen}
        size="md"
        content={<InputForm survey={survey} />}
      />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu surveyId={survey.id} />
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
              <PageBuilder survey={survey} />
            </Container>

            <Container
              variant="createformColumn"
              w="94%"
              alignItems="center"
              p="0"
            >
              <div className="background__grid">
                {selected_condition?.id !== undefined ? (
                  <ConditionPreview />
                ) : (
                  <InputsPreview order={survey.order} surveyId={survey.id} />
                )}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart selected_condition={selected_condition} survey={survey} />
      </Box>
    </Box>
  );
};
