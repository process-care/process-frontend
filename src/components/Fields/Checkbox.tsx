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
import { useField } from "formik";

interface Checkbox {
  value: string | undefined;
  label: string | undefined;
}

interface Props {
  label: string;
  helpText?: string;
  checkbox: Checkbox[] | undefined;
  isRequired?: boolean;
  id: string;
  isCollapsed?: boolean;
}

export const CustomCheckbox: React.FC<Props> = ({
  label,
  helpText,
  checkbox,
  isRequired,
  id,
  isCollapsed,
}) => {
  const [field, , helpers] = useField(id);
  const { setValue } = helpers;
  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <CheckboxGroup colorScheme="green" value={field.value}>
            <HStack flexWrap="wrap" spacing={5}>
              {checkbox ? (
                checkbox.map(({ value, label }) => {
                  return (
                    <Checkbox
                      id={id}
                      name={label}
                      key={value}
                      isRequired={isRequired}
                      onChange={(e) => setValue(e.target.name)}
                      defaultIsChecked={value === field.value}
                    >
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
        </>
      )}
    </FormControl>
  );
};
