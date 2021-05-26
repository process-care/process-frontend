import React, { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import t from "static/survey.json";
import { useField } from "formik";
import Select from "react-select";

interface Options {
  value: string | undefined;
  label: string | undefined;
}

interface Props {
  label: string;
  id: string;
  placeholder: string;
  helpText?: string;
  options: Options[] | undefined;
  isRequired?: boolean;
  isMulti?: boolean;
  isCollapsed?: boolean;
}

export const CustomSelect: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  options,
  isMulti,
  isCollapsed,
}): ReactElement => {
  const [, , helpers] = useField(id);
  console.log(options, "o");
  return (
    <FormControl id={id} textAlign="left">
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
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
        </>
      )}
    </FormControl>
  );
};
