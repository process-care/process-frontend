import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useField } from "formik";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  type?: string;
  inputRightAddon?: string;
  min_length?: string;
  max_length?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
  isRequired?: boolean;
}

export const CustomInput: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  type = "text",
  inputRightAddon,
  min_length,
  max_length,
  name,
  style,
  isRequired,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      id={name}
      textAlign="left"
      style={style}
      isInvalid={!!meta.error}>
      <FormLabel>
        {/* @ts-expect-error no alternative found for the moment*/}
        {label} {isRequired === "true" && "*"}
      </FormLabel>
      <InputGroup size="sm">
        <Input
          isRequired={isRequired}
          borderRadius="7px"
          type={type}
          size="md"
          placeholder={placeholder}
          min_length={min_length}
          max_length={max_length}
          {...field}
        />
        {inputRightAddon && (
          <InputRightAddon children={inputRightAddon} h="40px" />
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
