import { ButtonGroup, Button, Center, Box } from "@chakra-ui/react";
import { SvgHover } from "components/SvgHover";
import React from "react";
import { t } from "static/global";

import { ReactComponent as Trash } from "assets/trash.svg";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const Footer: React.FC<Props> = ({ onCancel, disabled, onSubmit }) => {
  return (
    <Box
      position="fixed"
      bottom="0"
      zIndex="10"
      backgroundColor="white"
      w="24.2%"
      p={4}
    >
      <ButtonGroup d="flex" justifyContent="space-around">
        <Button
          type="submit"
          variant="rounded"
          disabled={disabled}
          onClick={() => onSubmit()}
        >
          {t.validate}
        </Button>
        <Button variant="link" onClick={() => onCancel()} type="button">
          {t.cancel}
        </Button>
      </ButtonGroup>
    </Box>
  );
};
