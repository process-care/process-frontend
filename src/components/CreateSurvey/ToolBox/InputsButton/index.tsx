import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { inputs } from "constants/inputs";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

interface Props {
  onSelect: (type: string, name: string, id: string) => void;
}

const ToolBox: React.FC<Props> = ({ onSelect }) => {
  const dispatch = useDispatch();
  const id = uuidv4();
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
            onClick={() => onSelect(type, name, `${type}-${id}`)}>
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ToolBox;
