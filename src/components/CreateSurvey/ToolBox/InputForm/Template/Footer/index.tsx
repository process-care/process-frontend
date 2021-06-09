import { ButtonGroup, Button, Box } from "@chakra-ui/react";
import { Switch } from "components/Fields";
import React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  hideRequired?: boolean;
}

export const Footer: React.FC<Props> = ({
  onCancel,
  disabled,
  hideRequired,
  onSubmit,
}) => {
  return (
    <Box
      w="100%"
      position="sticky"
      bottom="0"
      backgroundColor="white"
      pb="10"
      borderTop="1px solid">
      {!hideRequired && (
        <Switch p="20px 0" label="Réponse obligatoire" id="required" />
      )}
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        w="75%"
        mx="auto"
        pt={2}>
        <Button
          type="submit"
          variant="rounded"
          disabled={disabled}
          onClick={() => onSubmit()}>
          Valider
        </Button>
        <Button variant="link" onClick={() => onCancel()} type="button">
          Annuler
        </Button>
      </ButtonGroup>
    </Box>
  );
};
