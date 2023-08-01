import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { SwitchControl } from "formik-chakra-ui";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  p?: string;
  m?: string;
  defaultChecked?: boolean;
  isRequired?: any;
  size?: "lg" | "md" | "sm";
}

export default function CustomSwitch({
  label,
  helpText,
  id,
  p,
  m,
  isRequired,
  size = "md",
}: Props): JSX.Element {
  const [, meta] = useField(id);
  return (
    <FormControl
      isRequired={isRequired}
      id={id}
      textAlign="left"
      p={p}
      m={m}
      display="flex"
      alignItems="center"
    >
      <SwitchControl
        name={id}
        id={id}
        size={size}
        mt={-3}
        isRequired={isRequired}
      />

      <FormLabel ml={5} mt={-2} fontSize={size}>
        {label}
      </FormLabel>

      <FormErrorMessage>{meta.error}</FormErrorMessage>

      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
