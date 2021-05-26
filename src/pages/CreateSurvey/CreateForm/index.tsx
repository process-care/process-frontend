import { Box, Container } from "@chakra-ui/react";
import React from "react";

import ToolBox from "components/CreateSurvey/ToolBox/InputsButton";
import Preview from "components/CreateSurvey/Preview";

import IPage from "interfaces/page";

import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addInput, selectInput } from "redux/slices/formBuilder";

import { Menu } from "components/Menu/CreateForm";
import { toogleDrawer } from "redux/slices/application";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";

export const CreateForm: React.FC<IPage> = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.application.drawer_is_open);

  const handleSelect = (
    input_type: string,
    name: string,
    id: string,
    internal_title: string | undefined
  ) => {
    if (id) {
      const data = {
        ...fields[input_type],
        input_type,
        name,
        id,
        internal_title,
      };
      dispatch(selectInput(data));
      dispatch(addInput(data));
      dispatch(toogleDrawer());
    }
  };

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

        <Container
          borderLeft="1px"
          variant="createformColumn"
          w="32%"
          alignItems="center"
          overflowY="auto">
          <ToolBox
            onSelect={(input_type, name, id, internal_title) =>
              handleSelect(input_type, name, id, internal_title)
            }
          />
        </Container>
      </Box>
    </Box>
  );
};
