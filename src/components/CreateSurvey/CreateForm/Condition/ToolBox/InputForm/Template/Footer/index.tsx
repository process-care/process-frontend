import { Button, Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

import SvgHover from "@/components/SvgHover";
import { t } from "@/static/global";

import Trash from "@/assets/trash.svg";

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
      className="w-full justify-between items-center bg-white border-t border-t-solid border-t-black"
      minW="300px"
      px={6}
      py={4}
    >
      {!hideDelete && (
        <Box w="70%" pl={4}>
          <SvgHover>
            <Image src={Trash} alt="Trash" onClick={() => !!onDelete && onDelete()} />
          </SvgHover>
        </Box>
      )}

      <Button variant="link" onClick={() => onCancel()} type="button" pr="20">
        {t.cancel}
      </Button>
      <Button
        type="submit"
        variant="rounded"
        disabled={disabled}
        onClick={() => onSubmit()}
      >
        {t.validate}
      </Button>
    </Flex>
  );
};
