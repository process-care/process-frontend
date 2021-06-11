import { ButtonGroup, Button, Center } from "@chakra-ui/react";
import React from "react";
import t from "static/global.json";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const Footer: React.FC<Props> = ({ onCancel, disabled, onSubmit }) => {
  return (
    <Center
      w="100%"
      position="absolute"
      bottom="0"
      backgroundColor="white"
      borderTop="1px solid"
      p={1}
      pb={3}>
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        w="75%"
        mx="auto"
        pt={2}>
        <Button variant="link" onClick={() => onCancel()} type="button">
          {t.cancel}
        </Button>
        <Button
          type="submit"
          variant="rounded"
          disabled={disabled}
          onClick={() => onSubmit()}>
          {t.validate}
        </Button>
      </ButtonGroup>
    </Center>
  );
};
