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
  rows: "small" | "medium" | "large" | undefined;
  isRequired?: boolean;
  id: string;
  m?: string | number;
  p?: string | number;
  isCollapsed?: boolean;
  isDisabled?: boolean;
}
export const CustomTextarea: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  min_length,
  max_length,
  rows,
  isRequired,
  id,
  m,
  p,
  isCollapsed,
  isDisabled,
}) => {
  const [field, meta] = useField(id);
  return (
    <FormControl
      isRequired={isRequired}
      id="email"
      textAlign="left"
      m={m}
      p={p}
      isInvalid={!!meta.error}
    >
      <FormLabel htmlFor={id} opacity={isDisabled ? "0.5" : "1"}>
        {label}
      </FormLabel>
      {!isCollapsed && (
        <>
          <Textarea
            isDisabled={isDisabled}
            id={id}
            style={{ resize: "none" }}
            rows={getRows(rows)}
            placeholder={placeholder}
            min_length={min_length}
            max_length={max_length}
            {...field}
          />
          <FormErrorMessage mt={-2} justifyContent="flex-end" fontSize="10px">
            {meta.error}
          </FormErrorMessage>
          <FormHelperText
            mt={-1}
            lineHeight={1.4}
            fontSize="xs"
            color="gray.400"
          >
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
