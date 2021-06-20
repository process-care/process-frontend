import { Box, Container } from "@chakra-ui/react";
import React from "react";

import IRoute from "interfaces/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";


export const CreateLanding: React.FC<IRoute> = () => {


  return (
    <Box h="100vh" overflow="hidden">
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu />
          <Box
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%">
            <Container variant="createformColumn" w="100%" alignItems="center" p="0">
              <div className="background__grid--black">

              </div>
            </Container>
          </Box>
        </Box>
        <ToolBox />


      </Box>
    </Box>
  );
};
