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
            <Box flexWrap="wrap" display="flex">
              {checkbox && (
                checkbox.map(({ value, label }) => {
                  return (
                    <CheckboxControl display={'flex'} w={'100%'} key={value} name={id} value={value} isRequired={isRequired} m={2} overflow="hidden">
                      {label}
                    </CheckboxControl>
                  );
                })
              )}
            </Box>

          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
