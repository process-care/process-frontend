import React from "react";
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import t from "static/survey.json";
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
}) => {
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
        />
        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Container>
  );
};
