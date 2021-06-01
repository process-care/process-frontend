import { Box, Container } from "@chakra-ui/react";
import React from "react";

import InputsPreview from "components/CreateSurvey/InputsPreview";

import IRoute from "interfaces/route";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

import { useAppSelector } from "redux/hooks";

import { Menu } from "components/Menu/CreateForm";

import { selectConditonInCurrentPage } from "redux/slices/formBuilder";
import { ConditionPreview } from "components/CreateSurvey/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";

export const CreateForm: React.FC<IRoute> = () => {
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);
  const isConditionPreview =
    useAppSelector(selectConditonInCurrentPage).length > 0;

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
              borderColor="gray.100">
              <PageBuilder />
            </Container>

            <Container
              variant="createformColumn"
              w="94%"
              p={0}
              alignItems="center">
              <div className="background__grid">
                {isConditionPreview ? <ConditionPreview /> : <InputsPreview />}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart isConditionPreview={isConditionPreview} />
      </Box>
    </Box>
  );
};
