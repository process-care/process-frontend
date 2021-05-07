import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  type: string;
  inputRightAddon: string;
  minLength?: number;
  maxLength?: number;
  name: string;
  id: string;
}

export const CustomInput: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  type,
  inputRightAddon,
  minLength,
  maxLength,
  id,
  name,
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
        <InputGroup size="sm">
          <Input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            minlength={minLength}
            maxLength={maxLength}
          />
          {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
        </InputGroup>

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
