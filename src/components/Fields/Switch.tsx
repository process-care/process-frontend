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
}

export const CustomSwitch: React.FC<Props> = ({
  label,
  helpText,
  id,
  p,
  m,
  defaultChecked,
}) => {
  const [field, meta] = useField(id);
  return (
    <>
      <FormControl
        id={id}
        textAlign="left"
        p={p}
        m={m}
        d="flex"
        alignItems="center">
        <Switch
          id={id}
          size="md"
          mt={-6}
          {...field}
          defaultChecked={defaultChecked}
        />
        <FormLabel ml={5} mt={-2}>
          {label}
        </FormLabel>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </>
  );
};
