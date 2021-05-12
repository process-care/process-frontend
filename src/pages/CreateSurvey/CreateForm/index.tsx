import { Box, Container } from "@chakra-ui/react";
import React from "react";

import ToolBox from "components/CreateSurvey/ToolBox";
import Preview from "components/CreateSurvey/Preview";

import IPage from "interfaces/page";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

export const CreateForm: React.FC<IPage> = () => {
  const [selectedInput, setSelectedInput] = React.useState({
    type: "",
    name: "",
    id: 0,
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (type: string, name: string, id: number) => {
    if (id) {
      setSelectedInput({ type, name, id });
      setIsOpen(true);
    }
  };

  return (
    <>
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
        <Container variant="createformColumn" w="6%" minW="100px">
          <PageBuilder />
        </Container>
        <Container
          variant="createformColumn"
          w="65%"
          bg="gray.100"
          p={0}
          alignItems="center"
        >
          <Preview />
        </Container>
        <Container
          variant="createformColumn"
          w="32%"
          alignItems="center"
          overflowY="auto"
        >
          <ToolBox
            onSelect={(type, name, id) => handleSelect(type, name, id)}
          />
        </Container>
      </Box>
    </>
  );
};
