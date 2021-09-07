import React, { ReactElement } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { t } from "static/survey";
import { useField, useFormikContext } from "formik";
import CreatableSelect from "react-select/creatable";

interface Options {
  value: string | undefined;
  label: string | undefined;
}

interface Props {
  label: string;
  id: string;
  placeholder: string;
  helpText?: string;
  answers: Options[] | undefined;
  isRequired?: boolean;
  isMulti?: boolean;
  isCollapsed?: boolean;
  name: string;
}

interface IProvided {
  provided: Record<string, unknown>;
}

const customStyles: Record<string, unknown> = {
  option: (provided: IProvided) => ({
    ...provided,
    padding: "10px",
    fontSize: "12px",
  }),
  input: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  placeholder: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  singleValue: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  noOptionsMessage: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  container: (provided: IProvided) => ({
    ...provided,

    padding: 0,
  }),
  valueContainer: (provided: IProvided) => ({
    ...provided,
    minHeight: "40px",
  }),
};

export const CustomCreatableSelect: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  answers,
  isCollapsed,
  isMulti,
  name,
}): ReactElement => {
  const [field, ,] = useField(id);
  const { setFieldValue } = useFormikContext();

  console.log(field);

  return (
    <FormControl id={id} textAlign="left">
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <CreatableSelect
            styles={customStyles}
            id={id}
            name={name}
            isRequired={isRequired}
            placeholder={placeholder}
            noOptionsMessage={() => t.not_found}
            options={answers}
            onChange={(value) => setFieldValue(field.name, value)}
            defaultValue={field.value}
            isMulti={isMulti}
          />
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};