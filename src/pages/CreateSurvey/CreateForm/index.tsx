import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

import ToolBox from "components/CreateSurvey/ToolBox/InputsButton";
import Preview from "components/CreateSurvey/Preview";

import IPage from "interfaces/page";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

import { useAppDispatch } from "redux/hooks";
import { addInput } from "redux/slices/formBuilder";

import "index.css";

export const CreateForm: React.FC<IPage> = () => {
  const dispatch = useAppDispatch();

  const [selectedInput, setSelectedInput] = React.useState({
    type: "",
    name: "",
    id: "",
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (type: string, name: string, id: string) => {
    if (id) {
      setSelectedInput({ type, name, id });
      dispatch(addInput({ type, name, id }));
      setIsOpen(true);
    }
  };

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer
        isOpen={isOpen}
        onOverlayClick={() => setIsOpen(false)}
        size="md"
        content={
          <InputForm
            selectedInput={selectedInput}
            onClose={() => setIsOpen(false)}
          />
        }
      />

      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Flex p={4} borderBottom="1px" justifyContent="flex-start">
            <Text fontSize="12px" mr={20} ml={83}>
              Dashboard
            </Text>
            <Text fontSize="12px">TITRE DU FORMULAIRE</Text>
          </Flex>

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

        <Container
          borderLeft="1px"
          variant="createformColumn"
          w="32%"
          alignItems="center"
          overflowY="auto">
          <ToolBox
            onSelect={(type, name, id) => handleSelect(type, name, id)}
          />
        </Container>
      </Box>
    </Box>
  );
};
