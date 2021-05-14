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
  onChange,
  onBlur,
  style,
}) => {
  return (
    <FormControl id="email" textAlign="left" style={style}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="sm">
        <Input
          borderRadius="7px"
          type={type}
          size="md"
          name={name}
          id={name}
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
