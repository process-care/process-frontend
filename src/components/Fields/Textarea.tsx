import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { getRows } from "./utils";

import { useField } from "formik";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  rows: "small" | "medium" | "large" | undefined;
  isRequired?: any;
  id: string;
  m?: string | number;
  p?: string | number;
  isCollapsed?: boolean;
  isDisabled?: boolean;
  appearance?: "light";
}
export const CustomTextarea: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  rows,
  isRequired,
  id,
  m,
  p,
  isCollapsed,
  isDisabled,
  appearance,
}) => {
  const [field, meta] = useField(id);
  const isLight = appearance === "light";

  return (
    <FormControl
      isRequired={isRequired === "true"}
      id={id}
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
            variant={isLight ? "flushed" : "outline"}
            paddingLeft={isLight ? "0" : "10px"}
            backgroundColor={isLight ? "white" : "inherit"}
            fontSize={isLight ? "16px" : "12px"}
            _placeholder={{
              color: "#9E9E9E",
              fontSize: isLight ? "16px" : "12px",
            }}
            overflow="hidden"
            isDisabled={isDisabled}
            id={id}
            style={{ resize: "none" }}
            rows={getRows(rows)}
            placeholder={placeholder}
            maxLength={getRows(rows) * 145}
            isRequired={isRequired === "true"}
            {...field}
          />
          {meta.touched && meta.error && (
            <Text fontSize="10px" color="red" textAlign="right">
              {meta.error}
            </Text>
          )}
          <FormHelperText
            mt={1}
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
