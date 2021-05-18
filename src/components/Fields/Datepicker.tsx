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
}
export const CustomDatePicker: React.FC<Props> = ({ id, label, helpText }) => {
  const [field, meta] = useField(id);
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <FormControl id={id} textAlign="left">
      <FormLabel>{label}</FormLabel>
      <DatePicker
        {...field}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    </FormControl>
  );
};
