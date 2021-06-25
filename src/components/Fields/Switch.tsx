import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useField } from "formik";

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
  const [field, meta, helpers] = useField(id);
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
      <Switch
        size={size}
        aria-labelledby={id}
        id={id}
        mt={-6}
        isChecked={field.value}
        onChange={() => helpers.setValue(!field.value)}
      />
      <FormLabel ml={5} mt={-2} fontSize={size}>
        {label}
      </FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
