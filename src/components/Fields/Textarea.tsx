import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { getRows } from "./utils";

import { useField } from "formik";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  rows: "small" | "medium" | "large";
  isRequired?: boolean;
  name: string;
  id: string;
  m?: string | number;
  p?: string | number;
}
export const CustomTextarea: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  minLength,
  maxLength,
  rows,
  isRequired,
  name,
  id,
  m,
  p,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      id="email"
      textAlign="left"
      m={m}
      p={p}
      isInvalid={!!meta.error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        id={id}
        isRequired={isRequired}
        style={{ resize: "none" }}
        rows={getRows(rows)}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        {...field}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText mt={0} lineHeight={1.4} fontSize="xs" color="gray.400">
        {helpText}
      </FormHelperText>
    </FormControl>
  );
};
