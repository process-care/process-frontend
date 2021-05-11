import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
// import { formStore } from "stores/inputs";

interface Props {
  onSelect: (type: string, name: string, date: number) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  // const addInput = formStore((state) => state.addInput);

  return (
    <ButtonGroup
      d="flex"
      spacing="2"
      w="100%"
      flexWrap="wrap"
      justifyContent="center">
      {inputs.map(({ type, name }, i) => {
        return (
          <Button
            variant="box"
            key={i}
            onClick={() => onSelect(type, name, Date.now())}>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
