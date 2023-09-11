import { Button, Box, Flex } from "@chakra-ui/react";

import SvgHover from "@/components/SvgHover/index.tsx"
import { t } from "@/static/global.ts"
import { Icons } from "@/components/icons";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  onDelete?: () => void;
  hideDelete?: boolean;
}

export default function Footer({
  onCancel,
  disabled,
  onSubmit,
  onDelete,
  hideDelete,
}:Props ): JSX.Element {
  return (
    <Flex
      className="w-full py-4 px-10 justify-between items-center bg-white border-t border-t-solid border-t-black"
      minW="300px"
    >
      {!hideDelete && (
        <Box w="70%">
          <SvgHover>
            <Icons.delete onClick={() => !!onDelete && onDelete()} />
          </SvgHover>
        </Box>
      )}

      <Button variant="link" onClick={() => onCancel()} type="button" pr="20">
        {t.cancel}
      </Button>
      
      <Button
        type="submit"
        variant="rounded"
        w="128px"
        disabled={disabled}
        onClick={() => onSubmit()}
      >
        {t.validate}
      </Button>
    </Flex>
  );
};
