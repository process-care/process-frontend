import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import IQuestion from "interfaces/form/question";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";

interface Props {
  onSelect: (
    type: IQuestion["type"],
    name: string,
    id: string,
    internal_title: string | undefined
  ) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  const id = uuidv4();
  return (
    <ButtonGroup d="flex" spacing="2" w="100%" flexWrap="wrap">
      {inputs.map(({ type, name }, i) => {
        return (
          <Button
            flex="40%"
            d="flex"
            justifyContent="flex-start"
            variant="box"
            whiteSpace="normal"
            textAlign="left"
            key={i}
            py="30px"
            isDisabled={type === "wysiwyg"}
            pl={3}
            onClick={() =>
              onSelect(type, name, `${type}-${id}`, `${type}-${id}`)
            }
          >
            <Box mr={2}>
              <InputIcon type={type} />
            </Box>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
