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
  isRequired?: boolean;
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
  const [field, meta, helpers] = useField(name);

  React.useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue]);
  console.log(field);

  return (
    <FormControl
      id={name}
      textAlign="left"
      style={style}
      isInvalid={!!meta.error}>
      <FormLabel>
        {/* @ts-expect-error no alternative found for the moment*/}
        {label} {(isRequired === "true" || isRequired) && "*"}
      </FormLabel>
      {!isCollapsed && (
        <>
          <InputGroup>
            <NumberInput
              defaultValue={defaultValue}
              min={min}
              max={max}
              precision={precision}
              allowMouseWheel
              w="100%"
              {...field}>
              <NumberInputField placeholder={placeholder} />
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
