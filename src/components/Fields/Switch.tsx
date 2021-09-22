import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useField } from "formik";
import { SwitchControl } from "formik-chakra-ui";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  p?: string;
  m?: string;
  defaultChecked?: boolean;
  isRequired?: boolean;
  size?: "lg" | "md" | "sm";
}

export const CustomSwitch: React.FC<Props> = ({
  label,
  helpText,
  id,
  p,
  m,
  isRequired,
  size = "md",
}) => {
  const [, meta] = useField(id);
  return (
    <FormControl
      isRequired={isRequired}
      id={id}
      textAlign="left"
      p={p}
      m={m}
      d="flex"
      alignItems="center"
    >
      <SwitchControl name={id} label="" size={size} mt={-3} />
      <FormLabel ml={5} mt={-2} fontSize={size}>
        {label}
      </FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
