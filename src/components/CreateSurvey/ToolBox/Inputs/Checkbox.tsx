import React from "react";
import {
  Container,
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
    <Container variant="inputContainer">
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
        <FormHelperText fontSize="xs">{helpText}</FormHelperText>
      </FormControl>
    </Container>
  );
};
