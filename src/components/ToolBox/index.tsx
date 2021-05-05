import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";

interface Props {
  onSelect: (id: string) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  return (
    <ButtonGroup
      d="flex"
      spacing="2"
      w="100%"
      flexWrap="wrap"
      justifyContent="center">
      {inputs.map(({ id, name }) => {
        return (
          <Button variant="box" key={id} onClick={() => onSelect(id)}>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
