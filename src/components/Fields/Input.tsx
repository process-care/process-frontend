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
  minLength?: number;
  maxLength?: number;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
}

export const CustomInput: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  type = "text",
  inputRightAddon,
  minLength,
  maxLength,
  name,

  style,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      id="email"
      textAlign="left"
      style={style}
      isInvalid={!!meta.error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="sm">
        <Input
          borderRadius="7px"
          type={type}
          size="md"
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          {...field}
        />
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
