import { Box, Container } from "@chakra-ui/react";
import React from "react";

import InputsPreview from "components/CreateSurvey/CreateForm/InputsPreview";

import IRoute from "interfaces/route";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/CreateForm/PageBuilder";

import { useAppSelector } from "redux/hooks";

import { Menu } from "components/Menu/CreateForm";

import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";

export const CreateForm: React.FC<IRoute> = () => {
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);
  const { selected_condition, selected_page } = useAppSelector(
    (state) => state.formBuilder
  );

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
            w="100%">
            <Container
              variant="createformColumn"
              w="6%"
              minW="100px"
              borderRight="1px"
              borderColor="gray.200">
              <PageBuilder />
            </Container>

            <Container variant="createformColumn" w="94%" alignItems="center" p="0">
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
