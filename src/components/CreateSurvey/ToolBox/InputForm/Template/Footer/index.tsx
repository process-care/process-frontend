import { ButtonGroup, Button } from "@chakra-ui/react";
import { Switch } from "components/Fields";
import React from "react";

interface Props {
  onCancel: () => void;
  disabled: boolean;
}

export const Footer: React.FC<Props> = ({ onCancel, disabled }) => {
  return (
    <>
      <Switch p="20px 0" label="Réponse obligatoire" id="required" />
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        w="75%"
        mx="auto"
        pt={2}>
        <Button type="submit" variant="rounded" disabled={disabled}>
          Valider
        </Button>
        <Button variant="link" onClick={() => onCancel()} type="button">
          Annuler
        </Button>
      </ButtonGroup>
    </>
  );
};
