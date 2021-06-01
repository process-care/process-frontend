import { Flex, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  confirm: () => void;
  close: () => void;
}

export const RemovingConfirmation: React.FC<Props> = ({ confirm, close }) => {
  return (
    <Flex
      backgroundColor="black"
      h="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center">
      <Text fontSize="25px" color="white" mb={10}>
        Voulez-vous supprimer cette page ?
      </Text>
      <ButtonGroup
        color="white"
        w="100%"
        d="flex"
        justifyContent="space-around">
        <Button variant="link" color="white" onClick={() => close()}>
          Annuler
        </Button>
        <Button variant="roundedBlue" onClick={() => confirm()}>
          Oui
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
