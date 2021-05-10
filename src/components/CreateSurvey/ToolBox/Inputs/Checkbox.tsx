import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";

interface Checkbox {
  id: string;
  value: string;
  labelValue: string;
}

interface Props {
  label: string;
  helpText?: string;
  checkbox: Checkbox[];
}

export const CustomCheckbox: React.FC<Props> = ({
  label,
  helpText,
  checkbox,
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
        <CheckboxGroup colorScheme="green">
          <HStack flexWrap="wrap" spacing={5}>
            {checkbox.map(({ id, value, labelValue }) => {
              return (
                <Checkbox id={id} name={value} value={value} key={id}>
                  {labelValue}
                </Checkbox>
              );
            })}
          </HStack>
        </CheckboxGroup>

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
