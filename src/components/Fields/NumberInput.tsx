import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
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
}) => {
  const [, meta, helpers] = useField(name);

  React.useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <FormControl id="email" textAlign="left" style={style}>
      <FormLabel>
        {/* @ts-expect-error no alternative found for the moment*/}
        {label} {isRequired === "true" && "*"}
      </FormLabel>
      <InputGroup>
        <NumberInput
          name={name}
          isRequired={isRequired}
          defaultValue={defaultValue}
          min={min}
          max={max}
          precision={precision}
          allowMouseWheel
          w="100%"
          onChange={(value) => helpers.setValue(value)}>
          <NumberInputField placeholder={placeholder} />

          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
