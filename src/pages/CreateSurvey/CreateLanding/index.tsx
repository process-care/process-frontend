import { Box, Collapse, Container } from "@chakra-ui/react";
import React from "react";

import IRoute from "interfaces/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useAppSelector } from "redux/hooks";

export const CreateLanding: React.FC<IRoute> = () => {
  const { preview_mode } = useAppSelector((state) => state.application);

  return (
    <Box overflow="auto">
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%" pos="relative">
          <Box
            position="fixed"
            top="0"
            w="75.8%"
            backgroundColor="white"
            zIndex="10"
          >
            <Menu isLanding />
          </Box>
          <Box
            mt={preview_mode !== "landing" ? "60px" : "0"}
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%"
            h="100%"
          >
            <Container
              variant="createformColumn"
              w="100%"
              h="100%"
              alignItems="center"
              p="0"
              d="flex"
            >
              <div className="background__grid--black">
                <Preview />
              </div>
            </Container>
          </Box>
        </Box>
        <Collapse in={preview_mode !== "landing"} style={{ width: "32%" }}>
          <ToolBox />
        </Collapse>
      </Box>
    </Box>
  );
};
