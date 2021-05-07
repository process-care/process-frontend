import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { getRows } from "./utils";

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
}) => {
  return (
    <Box
      margin="5"
      border="1px"
      padding={4}
      borderRadius={5}
      borderColor="gray.300"
      backgroundColor="white"
      width="100%">
      <FormControl id="email" textAlign="left">
        <FormLabel>{label}</FormLabel>
        <Textarea
          name={name}
          id={id}
          isRequired={isRequired}
          style={{ resize: "none" }}
          rows={getRows(rows)}
          placeholder={placeholder}
          minlength={minLength}
          maxLength={maxLength}
        />

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
