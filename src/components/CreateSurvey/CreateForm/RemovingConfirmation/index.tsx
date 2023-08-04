import React from "react";
import { ButtonGroup, Center, Text } from "@chakra-ui/react";

import { t } from "@/static/global";

interface Props {
  confirm: () => Promise<void> | any;
  close: () => void;
  content: string;
  height?: string;
}

import { Button } from "@/components/Shadcn/button"

export default function RemovingConfirmation({
  confirm,
  close,
  content,
  height,
}: Props): JSX.Element {
  return (
    <Center
      className="absolute mt-5 p-2 w-full flex flex-col bg-black text-white"
      h={height}
    >
      <Text variant="smallTitle">{content}</Text>

      <ButtonGroup className="flex justify-around w-1/2 mt-4">
        <Button className="text-white" variant="link" onClick={close}>
          {t.cancel}
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={confirm}
        >
          {t.remove}
        </Button>
      </ButtonGroup>
    </Center>
  );
};
