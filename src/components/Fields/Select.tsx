import React, { ReactElement } from "react";
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import t from "static/survey.json";
import { Field } from "formik";
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
  const SelectField = (FieldProps) => {
    return (
      <Select
        isMulti={isMulti}
        isClearable
        id={id}
        isRequired={isRequired}
        placeholder={placeholder}
        noOptionsMessage={() => t.not_found}
        options={FieldProps.options}
        {...FieldProps.field}
        onChange={(option) =>
          FieldProps.form.setFieldValue(FieldProps.field.name, option)
        }
      />
    );
  };

  return (
    <Container variant="inputContainer">
      <FormControl id="email" textAlign="left">
        <FormLabel>{label}</FormLabel>
        <Field name={id} options={options} component={SelectField} />
        <FormHelperText fontSize="xs">{helpText}</FormHelperText>
      </FormControl>
    </Container>
  );
};
