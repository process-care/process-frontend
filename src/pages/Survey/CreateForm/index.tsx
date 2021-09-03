import { Box, Container } from "@chakra-ui/react";
import React from "react";
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
import { useGetSurvey } from "call/actions/survey";

export const CreateForm: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();
  const { data, isLoading, error } = useGetSurvey(surveyId);

  const isOpen = useAppSelector((state) => state.application.drawer_is_open);
  const { selected_condition } = useAppSelector((state) => state.formBuilder);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data?.survey) {
    return <div>No Survey</div>;
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer
        isOpen={isOpen}
        size="md"
        content={<InputForm survey={data?.survey} />}
      />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu surveyId={surveyId} />
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
              <PageBuilder survey={data?.survey} />
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
                  <InputsPreview
                    order={data?.survey.order}
                    surveyId={surveyId}
                  />
                )}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart
          selected_condition={selected_condition}
          survey={data?.survey}
        />
      </Box>
    </Box>
  );
};