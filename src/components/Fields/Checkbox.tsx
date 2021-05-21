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
  return (
    <FormControl id={id} textAlign="left">
      <FormLabel>
        {/* @ts-expect-error no alternative found for the moment*/}
        {label} {isRequired === "true" && "*"}
      </FormLabel>
      {!isCollapsed && (
        <>
          {" "}
          <CheckboxGroup colorScheme="green">
            <HStack flexWrap="wrap" spacing={5}>
              {checkbox ? (
                checkbox.map(({ value, label }) => {
                  return (
                    <Checkbox
                      id={id}
                      name={label}
                      key={value}
                      isRequired={isRequired}
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
