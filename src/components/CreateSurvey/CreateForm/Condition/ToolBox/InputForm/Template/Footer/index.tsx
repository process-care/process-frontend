import { Button, Box, Flex } from "@chakra-ui/react";
import { SvgHover } from "components/SvgHover";
import React from "react";
import { t } from "static/global";

import { ReactComponent as Trash } from "assets/trash.svg";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  onDelete?: () => void;
  hideDelete?: boolean;
  w?: string;
}

export const Footer: React.FC<Props> = ({
  onCancel,
  disabled,
  onSubmit,
  onDelete,
  hideDelete,
  w = "43%",
}) => {
  return (
    <Box
      minW="300px"
      w={w}
      position="fixed"
      bottom="0"
      backgroundColor="white"
      borderTop="1px solid"
      px={6}
      py={4}
      right="-1px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {!hideDelete && (
          <Box w="70%" pl={4}>
            <SvgHover>
              <Trash onClick={() => !!onDelete && onDelete()} />
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
    </Box>
  );
};
