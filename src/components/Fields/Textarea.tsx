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
}) => {
  const [field, meta] = useField(id);
  return (
    <FormControl
      id="email"
      textAlign="left"
      m={m}
      p={p}
      isInvalid={!!meta.error}
    >
      <FormLabel htmlFor={id}>
        {/* @ts-expect-error no alternative found for the moment*/}
        {label} {(isRequired === "true" || isRequired) && "*"}
      </FormLabel>
      {!isCollapsed && (
        <>
          <Textarea
            id={id}
            // isRequired={isRequired}
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
            mt={0}
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
