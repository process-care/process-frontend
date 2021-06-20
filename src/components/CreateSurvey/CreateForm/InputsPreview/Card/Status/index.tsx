import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  confirm: () => void;
  close: () => void;
}

export const RemovingConfirmation: React.FC<Props> = ({ confirm, close }) => {
  return (
    <Box>
      <Text fontSize="16px">Voulez-vous supprimer ce champs ?</Text>
      <ButtonGroup>
        <Button variant="outline" onClick={() => confirm()}>
          Oui
        </Button>
        <Button variant="outline" onClick={() => close()}>
          Non
        </Button>
      </ButtonGroup>
    </Box>
  );
};
