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
}

export const Footer: React.FC<Props> = ({
  onCancel,
  disabled,
  onSubmit,
  onDelete,
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
      <Box w="70%" pl={4}>
        <SvgHover>
          <Trash onClick={() => !!onDelete && onDelete()} />
        </SvgHover>
      </Box>

      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        w="75%"
        mx="auto"
        pt={2}
      >
        <Button variant="link" onClick={() => onCancel()} type="button">
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
