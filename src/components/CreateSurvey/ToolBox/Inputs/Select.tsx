import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";

interface Options {
  value: string;
  labelValue: string;
}

interface Props {
  label: string;
  id: string;
  placeholder: string;
  helpText?: string;
  options: Options[];
  isRequired?: boolean;
}
export const CustomSelect: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  options,
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
        <Select
          size="lg"
          id={id}
          isRequired={isRequired}
          placeholder={placeholder}>
          {options.map(({ value, labelValue }) => {
            return (
              <option value={value} key={value}>
                {labelValue}
              </option>
            );
          })}
        </Select>

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
