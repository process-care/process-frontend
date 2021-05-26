import React from "react";
import { useAppDispatch } from "redux/hooks";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";
import { addInput, selectInput } from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();

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
    <Container
      flexDirection="column"
      borderLeft="1px"
      variant="createformColumn"
      minW="300px"
      alignItems="center"
      overflowY="auto"
      w="32%">
      <ToolBox
        onSelect={(input_type, name, id, internal_title) =>
          handleSelect(input_type, name, id, internal_title)
        }
      />

      <Flex alignItems="center">
        <Button variant="roundedTransparent" mt={5}>
          {t.add_condition}
        </Button>
        <Text fontSize="10px">bloquer la page</Text>
      </Flex>
    </Container>
  );
};
