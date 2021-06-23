import { Box, Container } from "@chakra-ui/react";
import React from "react";

import IRoute from "interfaces/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";


export const CreateLanding: React.FC<IRoute> = () => {


  return (
    <Box overflow="auto">
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%" >
          <Box pos="sticky" top="0px">
            <Menu />

          </Box>
          <Box
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%"
            h="100%">
            <Container variant="createformColumn" w="100%" h="100%" overflow="scroll" alignItems="center" p="0">
              <div className="background__grid--black">
                <Preview/>
              </div>
            </Container>
          </Box>
        </Box>
        <ToolBox />
      </Box>
    </Box>
  );
};
