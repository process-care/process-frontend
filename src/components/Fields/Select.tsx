import { useEffect } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import Select from "react-select";

import { t } from "@/static/survey.ts"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"

interface Options {
  label: string;
  value: any;
}

interface Props {
  label: string;
  id: string;
  placeholder?: string;
  helpText?: string;
  answers: Options[] | undefined;
  isRequired?: any;
  isMulti?: boolean;
  isCollapsed?: boolean;
  defaultValue?: string;
  appearance?: "big";
}

interface IProvided {
  provided: Record<string, unknown>;
}

export default function CustomSelect({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  answers,
  isCollapsed,
  isMulti = false,
  defaultValue,
  appearance,
}: Props): JSX.Element {
  const { isTablet } = useMediaQueries();
  const isBig = appearance === "big";

  const [field, , helpers] = useField(id);
  const { setValue } = helpers;

  useEffect(() => {
    if (defaultValue && !field.value) {
      setValue(defaultValue);
    }
  }, [defaultValue, field.value, setValue]);

  const getLabel = () => {
    if (!answers) return;
    const selected = answers.find((answer) => answer.value === field.value);
    return selected?.label;
  };

  const customStyles: Record<string, unknown> = {
    option: (provided: IProvided) => ({
      ...provided,
      padding: "10px",
      fontSize: isTablet ? "16px" : isBig ? "16px" : "12px",
    }),

    input: (provided: IProvided) => ({
      ...provided,
      fontSize: isTablet ? "16px" : isBig ? "16px" : "12px",
      padding: isBig ? "16px" : "unset",
    }),
    placeholder: (provided: IProvided) => ({
      ...provided,
      color: "gray",
      fontSize: isTablet ? "16px" : isBig ? "16px" : "12px",
    }),
    singleValue: (provided: IProvided) => ({
      ...provided,

      fontSize: isTablet ? "16px" : isBig ? "16px" : "12px",
    }),
    noOptionsMessage: (provided: IProvided) => ({
      ...provided,
      fontSize: isTablet ? "16px" : isBig ? "16px" : "12px",
    }),
    container: (provided: IProvided) => ({
      ...provided,

      padding: 0,
    }),
    valueContainer: (provided: IProvided) => ({
      ...provided,
      minHeight: "40px",
      padding: isBig ? "0 15px" : "5px 10px",
    }),
  };
  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Select
            isMulti={isMulti}
            styles={customStyles}
            id={id}
            required={isRequired}
            placeholder={placeholder}
            noOptionsMessage={() => t.not_found}
            options={answers}
            onChange={(option) => setValue(option.value)}
            defaultValue={field.value}
            value={{ label: getLabel(), value: field.value }}
          />
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
