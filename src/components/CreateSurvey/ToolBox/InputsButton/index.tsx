import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSelect: (
    type: string,
    name: string,
    id: string,
    internal_title: string | undefined
  ) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  const id = uuidv4();
  return (
    <ButtonGroup
      d="flex"
      spacing="2"
      w="100%"
      flexWrap="wrap"
      justifyContent="center">
      {inputs.map(({ input_type, name }, i) => {
        return (
          <Button
            variant="box"
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
