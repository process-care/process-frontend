import React from "react";
import { Button, ButtonGroup, Center, Text } from "@chakra-ui/react";

import { t } from "@/static/global";

interface Props {
  confirm: () => Promise<void> | any;
  close: () => void;
  content: string;
  height?: string;
}

export default function RemovingConfirmation({
  confirm,
  close,
  content,
  height,
}: Props): JSX.Element {
  return (
    <Center
      h={height}
      pos="relative"
      backgroundColor="black"
      py="130px"
      px="10px"
      display="flex"
      flexDirection="column"
      color="white"
    >
      <Text variant="smallTitle">{content}</Text>
      <ButtonGroup
        pos="absolute"
        bottom="10px"
        display="flex"
        justifyContent="space-around"
        w="100%"
      >
        <Button variant="link" color="white" onClick={() => close()}>
          {t.cancel}
        </Button>
        <Button variant="rounded" onClick={() => confirm()}>
          {t.validate}
        </Button>
      </ButtonGroup>
    </Center>
  );
};
