import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";

interface Radios {
  id: string;
  value: string;
  labelValue: string;
}

interface Props {
  label: string;
  helpText?: string;
  radios: Radios[];
}

export const CustomRadioBox: React.FC<Props> = ({
  label,
  helpText,
  radios,
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
        <RadioGroup colorScheme="green">
          <HStack flexWrap="wrap" spacing={5}>
            {radios.map(({ id, value, labelValue }) => {
              return (
                <Radio id={id} name={value} value={value} key={id}>
                  {labelValue}
                </Radio>
              );
            })}
          </HStack>
        </RadioGroup>
        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
