import { Box, Container } from "@chakra-ui/react";
import React from "react";

import Preview from "components/CreateSurvey/Preview";

import IRoute from "interfaces/route";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

import { useAppSelector } from "redux/hooks";

import { Menu } from "components/Menu/CreateForm";

import { PageForm } from "components/CreateSurvey/ToolBox/PageForm";

export const CreateForm: React.FC<IRoute> = () => {
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);

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
                <Preview />
              </div>
            </Container>
          </Box>
        </Box>
        <PageForm />
      </Box>
    </Box>
  );
};
