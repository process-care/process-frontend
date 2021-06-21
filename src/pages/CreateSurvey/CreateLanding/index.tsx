import { Box, Circle, Container, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";

import IRoute from "interfaces/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";


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
                <Box h="1200px" backgroundColor="white" w="80%" mx="auto" mt="100px" >
                  <Flex justifyContent="space-between" p="5" alignItems="center">
                    <Circle size="40px" bg="brand.gray.200" color="white"></Circle>
                    <Text variant="currentLight" textTransform="uppercase">Titre de l'étude</Text>
                    <Button variant="rounded" backgroundColor="#FF7A00" color="white">
                      Participer à l'étude
                    </Button>
                  </Flex>


                  <Box backgroundColor="#FFB800" py="70px" color="white" textAlign="left" px="10%">
                    <Text variant="xl">
                      Etude portant sur la dépression curabitur blandit tempus porttitor.
                    </Text>
                    <Text variant="smallTitle" mt='30px'>
                      Sous titre de l’étude,Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    </Text>
                  </Box>
                </Box>
              </div>
            </Container>
          </Box>
        </Box>
        <ToolBox />
      </Box>
    </Box>
  );
};
