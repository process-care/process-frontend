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
  min_length?: number;
  max_length?: number;
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
  min_length,
  max_length,
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
        min_length={min_length}
        max_length={max_length}
        {...field}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText mt={0} lineHeight={1.4} fontSize="xs" color="gray.400">
        {helpText}
      </FormHelperText>
    </FormControl>
  );
};