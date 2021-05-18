import React, { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import t from "static/survey.json";
import { useField } from "formik";
import Select from "react-select";

interface Options {
  value: string;
  label: string;
}

interface Props {
  label: string;
  id: string;
  placeholder: string;
  helpText?: string;
  options: Options[];
  isRequired?: boolean;
  isMulti?: boolean;
}

export const CustomSelect: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  options,
  isMulti,
}): ReactElement => {
  const [, , helpers] = useField(id);

  return (
    <FormControl id="email" textAlign="left">
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti={isMulti}
        isClearable
        id={id}
        isRequired={isRequired}
        placeholder={placeholder}
        noOptionsMessage={() => t.not_found}
        options={options}
        onChange={(value) => helpers.setValue(value)}
      />

      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
