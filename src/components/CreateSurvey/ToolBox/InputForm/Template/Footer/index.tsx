import { ButtonGroup, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}

export const Footer: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <ButtonGroup
      d="flex"
      justifyContent="space-between"
      w="75%"
      mx="auto"
      pt={2}>
      <Button onClick={() => onSubmit()} variant="rounded">
        Valider
      </Button>
      <Button
        variant="link"
        textDecoration="underline"
        color="black"
        onClick={() => onCancel()}>
        Annuler
      </Button>
    </ButtonGroup>
  );
};
