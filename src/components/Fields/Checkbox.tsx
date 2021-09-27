import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Flex,
} from "@chakra-ui/react";

import { CheckboxContainer, CheckboxControl } from "formik-chakra-ui";

interface Checkbox {
  value: string;
  label: string;
}

interface Props {
  label: string;
  helpText?: string;
  checkbox: Checkbox[];
  isRequired?: any;
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
    <FormControl
      id={id}
      textAlign="left"
      isRequired={isRequired === "true"}
      display="flex"
      flexDirection="row-reverse"
    >
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <CheckboxContainer name={id} label="">
            <Flex p="0">
              {checkbox ? (
                checkbox.map(({ value, label }) => {
                  return (
                    <CheckboxControl
                      name={id}
                      value={value}
                      isRequired={isRequired}
                    >
                      {label}
                    </CheckboxControl>
                  );
                })
              ) : (
                <Box p={4} />
              )}
            </Flex>
          </CheckboxContainer>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
