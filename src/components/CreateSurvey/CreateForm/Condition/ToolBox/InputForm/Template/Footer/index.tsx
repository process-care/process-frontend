import { ButtonGroup, Button, Center, Box } from "@chakra-ui/react";
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
}

export const Footer: React.FC<Props> = ({
  onCancel,
  disabled,
  onSubmit,
  onDelete,
  hideDelete,
}) => {
  return (
    <Center
      w="100%"
      position="absolute"
      bottom="0"
      backgroundColor="white"
      borderTop="1px solid"
      p={1}
      pb={3}
    >
      {!hideDelete && (
        <Box w="70%" pl={4}>
          <SvgHover>
            <Trash onClick={() => !!onDelete && onDelete()} />
          </SvgHover>
        </Box>
      )}

      <ButtonGroup
        d="flex"
        justifyContent="flex-end"
        w="75%"
        mx="auto"
        pt={2}
        pr="5"
      >
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
      </ButtonGroup>
    </Center>
  );
};
