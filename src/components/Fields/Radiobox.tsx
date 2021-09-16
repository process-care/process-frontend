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
import { useField } from "formik";

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
  const [field, , helpers] = useField(id);
  const { setValue } = helpers;
  return (
    <FormControl id={id} textAlign="left" m={m} p={p} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <RadioGroup colorScheme="green" value={field.value}>
            <HStack flexWrap="wrap" spacing={5}>
              {radios ? (
                radios.map(({ value, label }) => {
                  return (
                    <Radio
                      id={id}
                      name={value}
                      value={value}
                      key={value}
                      isRequired={isRequired}
                      onChange={(e) => setValue(e.target.value)}
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
