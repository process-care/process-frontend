import { FormControl, FormHelperText, FormLabel, Box } from "@chakra-ui/react";
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

export default function CustomCheckbox({ label, helpText, checkbox, isRequired, id, isCollapsed }: Props): JSX.Element {
  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired} pl="0">
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <CheckboxContainer name={id} label="" p="0" mt="10px">
            <Box flexWrap="wrap" display="flex">
              {checkbox ? (
                checkbox.map(({ value, label }) => {
                  return (
                    <CheckboxControl key={value} name={id} value={value} isRequired={isRequired} m={2}>
                      {isRequired ? `${label} *` : label}
                    </CheckboxControl>
                  );
                })
              ) : (
                <Box p={4} />
              )}
            </Box>
          </CheckboxContainer>

          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
