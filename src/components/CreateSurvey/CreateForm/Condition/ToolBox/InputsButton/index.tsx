import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import IQuestion from "interfaces/form/question";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";

interface Props {
  onSelect: (
    type: IQuestion["input_type"],
    name: string,
    id: string,
    internal_title: string | undefined
  ) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  const id = uuidv4();
  return (
    <ButtonGroup d="flex" spacing="2" w="100%" flexWrap="wrap">
      {inputs.map(({ input_type, name }, i) => {
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
            pl={3}
            onClick={() =>
              onSelect(
                input_type,
                name,
                `${input_type}-${id}`,
                `${input_type}-${id}`
              )
            }
          >
            <Box mr={2}>
              <InputIcon input_type={input_type} />
            </Box>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
