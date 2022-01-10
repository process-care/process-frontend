import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import IQuestion from "types/form/question";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import { TitleDivider } from "components/TitleDivider";

interface Props {
  group?: "other" | "simple" | "algo";
  onSelect: (
    type: IQuestion["type"],
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
  return (
    <>
      <TitleDivider title="Questions simples" mt="2" mb="2" />

      <Category onSelect={onSelect} group="simple" />
      <TitleDivider title="Questions algorithmiques" mt="2" mb="2" />
      <Category onSelect={onSelect} group="algo" />
      <TitleDivider title="Autres" mt="2" mb="2" />

      <Category onSelect={onSelect} group="other" />
    </>
  );
};

export default ToolBox;
