import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useField } from "formik"
import { SwitchControl } from "formik-chakra-ui"

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
  defaultChecked,
  size = "md",
}: Props): JSX.Element {
  const [field, meta] = useField(id)

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
        id={id}
        name={id}
        size={size}
        mt={-3}
        isRequired={isRequired}
        defaultChecked={defaultChecked}
      />

      <FormLabel ml={5} mt={-2} fontSize={size}>
        {label}
      </FormLabel>

      <FormErrorMessage>{meta.error}</FormErrorMessage>

      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
