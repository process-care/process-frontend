import { ButtonGroup, Button, Box } from "@chakra-ui/react";

import { t } from "@/static/global";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function Footer({ onCancel, disabled, onSubmit }: Props): JSX.Element {
  return (
    <Box
      position="fixed"
      bottom="0"
      zIndex="10"
      backgroundColor="white"
      w="24.2%"
      p={4}
    >
      <ButtonGroup display="flex" justifyContent="space-around">
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
    </Box>
  );
};
