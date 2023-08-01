// import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { FormControl, FormHelperText, FormLabel, FormErrorMessage } from "@chakra-ui/react";

import DatePicker from "react-datepicker";

import { useField } from "formik";

interface Props {
  id: string;
  label: string;
  helpText?: string;
  isRequired?: any;
  isCollapsed?: boolean;
}

export const CustomDatePicker: React.FC<Props> = ({ id, label, helpText, isRequired, isCollapsed }) => {
  const [field, meta, helpers] = useField(id);
  const selected = field.value ? new Date(field.value) : new Date();

  const handleChange = (date: Date) => {
    if (date) {
      helpers.setValue(date.toISOString());
    }
  };

  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <DatePicker required={isRequired} selected={selected} onChange={handleChange} dateFormat="dd/MM/yyyy" />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
