import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";

import { useField } from "formik";

interface Props {
  label: string;
  helpText?: string;
  inputRightAddon?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  precision?: number;
  isRequired?: any;
  name: string;
  style?: React.CSSProperties | undefined;
  placeholder: string;
  isCollapsed?: boolean;
}
export const CustomNumberInput: React.FC<Props> = ({
  label,
  helpText,
  defaultValue,
  inputRightAddon,
  min,
  max,
  precision,
  isRequired,
  name,
  placeholder,
  style,
  isCollapsed,
}) => {
  const [field, meta] = useField(name);
  console.log(isRequired);
  return (
    <FormControl
      isRequired={isRequired === "true"}
      id={name}
      textAlign="left"
      style={style}
      isInvalid={!!meta.error}
    >
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <InputGroup>
            <NumberInput
              {...field}
              min={min}
              max={max}
              precision={precision}
              allowMouseWheel
              w="100%"
            >
              <NumberInputField
                backgroundColor="white"
                defaultValue={defaultValue}
                {...field}
                placeholder={placeholder}
                borderTopRightRadius={inputRightAddon !== null ? "0" : "5px"}
                borderBottomRightRadius={inputRightAddon !== null ? "0" : "5px"}
              />
            </NumberInput>
            {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
          </InputGroup>
          {meta.touched && meta.error && (
            <Text fontSize="10px" color="red" textAlign="right">
              {meta.error}
            </Text>
          )}
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
