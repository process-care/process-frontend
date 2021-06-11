import { Button, ButtonGroup, Center, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  confirm: () => void;
  close: () => void;
  content: string;
}

export const RemovingConfirmation: React.FC<Props> = ({
  confirm,
  close,
  content,
}) => {
  return (
    <Center
      mt={4}
      pos="relative"
      backgroundColor="black"
      py="130px"
      px="10px"
      d="flex"
      flexDirection="column"
      color="white">
      <Text variant="smallTitle">{content}</Text>
      <ButtonGroup
        pos="absolute"
        bottom="10px"
        d="flex"
        justifyContent="space-around"
        w="100%">
        <Button variant="link" color="white" onClick={() => close()}>
          Annuler
        </Button>
        <Button variant="rounded" onClick={() => confirm()}>
          Valider
        </Button>
      </ButtonGroup>
    </Center>
  );
};
