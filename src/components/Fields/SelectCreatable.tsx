import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import CreatableSelect from "react-select/creatable";

import { t } from "@/static/survey";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";

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
  isRequired?: any;
  isMulti?: boolean;
  isCollapsed?: boolean;
  name: string;
  appearance?: "big";
}

interface IProvided {
  provided: Record<string, unknown>;
}

export default function CustomCreatableSelect({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  answers,
  isCollapsed,
  isMulti,
  name,
  appearance,
}: Props): JSX.Element {
  const [field, ,] = useField(id);
  const { isTablet } = useMediaQueries();
  const isBig = appearance === "big";
  const { setFieldValue } = useFormikContext();

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
    }),
  };
  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <CreatableSelect
            styles={customStyles}
            id={id}
            name={name}
            required={isRequired}
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
