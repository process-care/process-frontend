import { Box, Container } from "@chakra-ui/react";
import React from "react";

import InputsPreview from "components/CreateSurvey/CreateForm/InputsPreview";

import IRoute from "interfaces/routes/route";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/CreateForm/PageBuilder";

import { useAppSelector } from "redux/hooks";

import { Menu } from "components/Menu/CreateForm";
import { useGetSurveyQuery } from "api/survey";

import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";

export const CreateForm: React.FC<IRoute> = () => {
  const { data, isLoading, error } = useGetSurveyQuery(
    "60ddd61f120575001567acc5"
  );
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);
  const { selected_condition, selected_page } = useAppSelector(
    (state) => state.formBuilder
  );

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }

  if (!data) {
    return <div>No Survey</div>;
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer isOpen={isOpen} size="md" content={<InputForm />} />

      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu />
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
              <PageBuilder pages={data.survey.pages} />
            </Container>

            <Container
              variant="createformColumn"
              w="94%"
              alignItems="center"
              p="0"
            >
              <div className="background__grid">
                {selected_condition.id !== "" ? (
                  <ConditionPreview />
                ) : (
                  <InputsPreview />
                )}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart
          selected_condition={selected_condition}
          selected_page={selected_page}
        />
      </Box>
    </Box>
  );
};
