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
} from "@chakra-ui/react";

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
  id: string;
  style: React.CSSProperties | undefined;
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
  id,
  style,
}) => {
  return (
    <FormControl id="email" textAlign="left" style={style}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <NumberInput
          name={name}
          id={id}
          isRequired={isRequired}
          defaultValue={defaultValue}
          min={min}
          max={max}
          precision={precision}
          allowMouseWheel
          w="100%"
          size="md">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
