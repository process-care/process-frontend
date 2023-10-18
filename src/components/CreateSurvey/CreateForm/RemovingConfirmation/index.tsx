import { ButtonGroup, Center, Text } from "@chakra-ui/react"

import { Button } from "@/components/Shadcn/button.tsx"
import { t } from "@/static/global.ts"

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
      className="
        min-w-fit
        absolute top-0 left-0 p-4 w-full h-full flex flex-col
        bg-black text-white border rounded-[5px] border-black
      "
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
