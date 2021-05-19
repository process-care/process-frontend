import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  HStack,
  Box,
} from "@chakra-ui/react";

interface Checkbox {
  value: string | undefined;
  label: string | undefined;
}

interface Props {
  label: string;
  helpText?: string;
  checkbox: Checkbox[] | undefined;
}

export const CustomCheckbox: React.FC<Props> = ({
  label,
  helpText,
  checkbox,
}) => {
  return (
    <FormControl id="email" textAlign="left">
      <FormLabel>{label}</FormLabel>
      <CheckboxGroup colorScheme="green">
        <HStack flexWrap="wrap" spacing={5}>
          {checkbox ? (
            checkbox.map(({ value, label }) => {
              return (
                <Checkbox name={value} value={value} key={value}>
                  {label}
                </Checkbox>
              );
            })
          ) : (
            <Box p={4} />
          )}
        </HStack>
      </CheckboxGroup>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
