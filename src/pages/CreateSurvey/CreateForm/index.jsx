import { Box, Container } from "@chakra-ui/react";
import React from "react";

import ToolBox from "components/CreateSurvey/ToolBox";
import Preview from "components/CreateSurvey/Preview";

import IPage from "interfaces/page";
import IInput from "interfaces/inputs";
import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

export const CreateForm: React.FC<IPage> = () => {
  const [selectedInput, setSelectedInput] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (id: IInput) => {
    setSelectedInput(id);
    setIsOpen(true);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOverlayClick={() => setIsOpen(false)}
        size="md"
        content={<InputForm selectedInput={selectedInput} />}
        placement="right"
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
          alignItems="center">
          <Preview />
        </Container>
        <Container
          variant="createformColumn"
          w="32%"
          alignItems="center"
          overflowY="auto">
          <ToolBox onSelect={(id) => handleSelect(id)} />
        </Container>
      </Box>
    </>
  );
};
