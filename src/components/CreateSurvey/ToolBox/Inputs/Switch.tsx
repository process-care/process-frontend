import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  p?: string;
  m?: string;
}

export const CustomSwitch: React.FC<Props> = ({
  label,
  helpText,
  id,
  p,
  m,
}) => {
  return (
    <>
      <FormControl
        id={id}
        textAlign="left"
        p={p}
        m={m}
        d="flex"
        alignItems="center"
      >
        <Switch id={id} size="md" mt={-6} />
        <FormLabel ml={5} mt={-2}>
          {label}
        </FormLabel>
      </FormControl>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </>
  );
};
