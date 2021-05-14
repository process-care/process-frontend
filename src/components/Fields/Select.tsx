import React, { ReactElement } from "react";
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import t from "static/survey.json";
import Select from "react-select";

import { useField } from "formik";

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
  // const [field, meta, helpers] = useField(name);
  // const handleChange = (value) => {
  //   field.onChange(value[0].value);
  // };

  // const handleBlur = () => {
  //   field.onBlur(id, true);
  // };

  return (
    <Container variant="inputContainer">
      <FormControl id="email" textAlign="left">
        <FormLabel>{label}</FormLabel>
        <Select
          isMulti={isMulti}
          isClearable
          id={id}
          isRequired={isRequired}
          placeholder={placeholder}
          options={options}
          noOptionsMessage={() => t.not_found}
          onChange={(option) =>
            helpers.setValue({ id, option: option[0].value })
          }
        />
        <FormHelperText fontSize="xs">{helpText}</FormHelperText>
      </FormControl>
    </Container>
  );
};
