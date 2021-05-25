import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
  Box,
} from "@chakra-ui/react";

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
  isRequired?: boolean;
  isCollapsed?: boolean;
}

export const CustomRadioBox: React.FC<Props> = ({
  label,
  helpText,
  radios,
  id,
  m,
  p,
  isRequired,
  isCollapsed,
}) => {
  return (
    <FormControl id={id} textAlign="left" m={m} p={p}>
      <FormLabel>
        {label} {isRequired && "*"}
      </FormLabel>
      {!isCollapsed && (
        <>
          <RadioGroup colorScheme="green">
            <HStack flexWrap="wrap" spacing={5}>
              {radios ? (
                radios.map(({ value, label }) => {
                  return (
                    <Radio
                      name={value}
                      value={value}
                      key={value}
                      isRequired={isRequired}
                    >
                      {label}
                    </Radio>
                  );
                })
              ) : (
                <Box p={5} />
              )}
            </HStack>
          </RadioGroup>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
