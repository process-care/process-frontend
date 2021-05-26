import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useField } from "formik";

interface Props {
  id: string;
  label: string;
  helpText?: string;
  isRequired?: boolean;
  isCollapsed?: boolean;
}

export const CustomDatePicker: React.FC<Props> = ({
  id,
  label,
  helpText,
  isRequired,
  isCollapsed,
}) => {
  const [field, meta] = useField(id);
  const [startDate, setStartDate] = React.useState<Date | [Date, Date] | null>(
    new Date()
  );
  const handleChange = (date: Date | [Date, Date] | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <DatePicker
            required={isRequired}
            {...field}
            selected={startDate}
            onChange={(d) => handleChange(d)}
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
