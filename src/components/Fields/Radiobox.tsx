import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";

interface Radios {
  value: string;
  labelValue: string;
}

interface Props {
  label: string;
  helpText?: string;
  radios: Radios[];
  id: string;
  m?: string;
  p?: string;
}

export const CustomRadioBox: React.FC<Props> = ({
  label,
  helpText,
  radios,
  id,
  m,
  p,
}) => {
  return (
    <FormControl id={id} textAlign="left" m={m} p={p}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup colorScheme="green">
        <HStack flexWrap="wrap" spacing={5}>
          {radios.map(({ value, labelValue }) => {
            return (
              <Radio name={value} value={value} key={value}>
                {labelValue}
              </Radio>
            );
          })}
        </HStack>
      </RadioGroup>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
