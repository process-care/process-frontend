import React from "react";
import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import { QuestionRedux } from "redux/slices/types";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";

interface Props {
  group?: "other" | "simple" | "complex";
  onSelect: (
    type: QuestionRedux["attributes"]["type"],
    id: string,
    internal_title: string | undefined
  ) => void;
}

const Category: React.FC<Props> = ({ onSelect, group }) => {
  const id = uuidv4();
  return (
    <ButtonGroup d="flex" spacing="2" w="100%" flexWrap="wrap">
      {inputs.map(({ type, name, category }, i) => {
        if (category === group) {
          return (
            <Button
              flex="30%"
              d="flex"
              justifyContent="flex-start"
              variant="box"
              whiteSpace="normal"
              textAlign="left"
              key={i}
              py="25px"
              pl={2}
              onClick={() => onSelect(type, `${type}-${id}`, `${type}-${id}`)}
              fontSize="14px"

              // maxWidth="160px"
              // minWidth="160px"
            >
              <Box mr={2}>
                <InputIcon type={type} />
              </Box>
              {name}
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
};

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  const Title = ({ children }: { children: React.ReactNode }) => {
    return (
      <Text
        variant="xxs"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="normal"
        textAlign="left"
        mb="2"
        mt="2"
      >
        {children}
      </Text>
    );
  };
  return (
    <>
      <Title>Contenu statique</Title>
      <Category onSelect={onSelect} group="other" />
      <Title>Questions standards</Title>
      <Category onSelect={onSelect} group="simple" />
      <Title>Questions complexes</Title>
      <Category onSelect={onSelect} group="complex" />
    </>
  );
};

export default ToolBox;
