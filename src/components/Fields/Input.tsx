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
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
  isRequired?: any;
  isCollapsed?: boolean;
  ref?: any;
}

export const CustomInput: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  type = "text",
  inputRightAddon,
  name,
  style,
  isRequired,
  isCollapsed,
  ref,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      isRequired={isRequired === "true"}
      id={name}
      textAlign="left"
      style={style}
      isInvalid={!!meta.error}
    >
      <FormLabel>{label}</FormLabel>

      {/*  TO DO MODIFY LATER - THE LIB WHO BIND FORMIK DONT LET PASS TYPE="PASSWORD" */}
      {!isCollapsed && (
        <>
          <InputGroup size="sm">
            <Input
              ref={ref}
              backgroundColor="white"
              borderRadius="7px"
              type={type}
              size="md"
              placeholder={placeholder}
              {...field}
            />
            {inputRightAddon && (
              <InputRightAddon children={inputRightAddon} h="40px" />
            )}
          </InputGroup>
          <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
            {meta.error}
          </FormErrorMessage>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
