import React from "react";
import {
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
  inputRightAddon?: string;
  minLength?: number;
  maxLength?: number;
  name: string;
  id: string;
  onChange?: (e: Event) => void;
  onBlur?: () => void;
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
  onChange,
  onBlur,
}) => {
  return (
    <FormControl id="email" textAlign="left">
      <FormLabel>{label}</FormLabel>
      <InputGroup size="sm">
        <Input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
        />
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>

      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
