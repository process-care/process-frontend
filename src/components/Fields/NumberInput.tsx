import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";

import { Maybe } from "@/api/graphql/types.generated";

interface Props {
  label: string;
  helpText?: string;
  inputRightAddon?: Maybe<string> | undefined;
  defaultValue?: string;
  min?: Maybe<number> | undefined;
  max?: Maybe<number> | undefined;
  precision?: Maybe<number> | undefined;
  isRequired?: any;
  name: string;
  style?: React.CSSProperties | undefined;
  placeholder: string;
  isCollapsed?: boolean;
  appearance?: "light" | "big";
}
export default function CustomNumberInput({
  label,
  helpText,
  defaultValue,
  inputRightAddon,
  min,
  max,
  precision,
  isRequired,
  name,
  placeholder,
  style,
  isCollapsed,
  appearance,
}: Props): JSX.Element {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl isRequired={isRequired} id={name} textAlign="left" style={style} isInvalid={!!meta.error}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <InputGroup mt={appearance === "big" ? "10px" : "0"}>
            <NumberInput
              min={min ?? undefined}
              max={max ?? undefined}
              precision={precision ?? 0}
              allowMouseWheel
              w="100%"
              fontSize="12px"
              value={field.value}
              onChange={(e) => {
                helpers.setValue(parseInt(e));
              }}
            >
              <NumberInputField
                backgroundColor="white"
                defaultValue={defaultValue}
                {...field}
                placeholder={placeholder}
                borderTopRightRadius={inputRightAddon !== null ? "0" : "5px"}
                borderBottomRightRadius={inputRightAddon !== null ? "0" : "5px"}
                p={appearance === "big" ? "30px" : "10px"}
                fontSize="12px"
              />
            </NumberInput>
            {inputRightAddon &&
              <InputRightAddon p={appearance === "big" ? "30px" : "10px"}>
                {inputRightAddon}
              </InputRightAddon>
            }
          </InputGroup>
          {meta.touched && meta.error && (
            <Text fontSize="10px" color="red" textAlign="right">
              {meta.error}
            </Text>
          )}
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
