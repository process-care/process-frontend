import React from "react";
import { FormControl, FormHelperText, FormLabel, Radio, RadioGroup, HStack, Box } from "@chakra-ui/react";
import { RadioGroupControl } from "formik-chakra-ui";

interface Radios {
  value: string | undefined;
  label: string | undefined;
}

interface Props {
  label: string;
  helpText?: string;
  radios: Radios[] | undefined;
  id: string;
  m?: string;
  p?: string;
  isRequired?: any;
  isCollapsed?: boolean;
}

export const CustomRadioBox: React.FC<Props> = ({ label, helpText, radios, id, m, p, isRequired, isCollapsed }) => {
  return (
    <FormControl id={id} textAlign="left" m={m} p={p} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <RadioGroup colorScheme="green">
            <HStack flexWrap="wrap" spacing={5}>
              <RadioGroupControl name={id} label="">
                <Box flexWrap="wrap" d="flex">
                  {radios ? (
                    radios.map(({ value, label }) => {
                      return (
                        <Radio value={value} id={id} key={value} isRequired={isRequired} m={2}>
                          {label}
                        </Radio>
                      );
                    })
                  ) : (
                    <Box p={5} />
                  )}
                </Box>
              </RadioGroupControl>
            </HStack>
          </RadioGroup>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
