import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import IInput from "interfaces/form/input";

interface Props {
  onSelect: (
    type: IInput["input_type"],
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
            variant="box"
            whiteSpace="normal"
            key={i}
            onClick={() =>
              onSelect(
                input_type,
                name,
                `${input_type}-${id}`,
                `${input_type}-${id}`
              )
            }>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
