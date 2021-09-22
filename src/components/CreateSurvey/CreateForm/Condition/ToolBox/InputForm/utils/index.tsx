import IQuestion from "types/form/question";
import React from "react";
import {
  TextareaFields,
  CheckboxFields,
  InputFields,
  NumberInputFields,
  RadioboxFields,
  SelectFields,
  SliderFields,
  DatepickerFields,
  WysiwygFields,
  FreeclassificationFields,
} from "../Template";
import {
  CommonFieldsSchema,
  MultipleInputFieldsSchema,
  SliderSchema,
  WysiwygSchema,
} from "../ValidationSchemas";

export const renderFormTemplate = (
  input: IQuestion | Record<string, any>
): React.ReactNode => {
  console.log("RENDER TEMPLATE");

  switch (input.type) {
    case "input":
      return <InputFields />;
      break;
    case "number_input":
      return <NumberInputFields />;
      break;
    case "checkbox":
      return <CheckboxFields />;
      break;
    case "radio":
      return <RadioboxFields />;
      break;
    case "select":
      return <SelectFields />;
      break;
    case "slider":
      return <SliderFields />;
      break;
    case "text_area":
      return <TextareaFields />;
      break;
    case "date_picker":
      return <DatepickerFields />;
      break;
    case "wysiwyg":
      return <WysiwygFields />;
    case "free_classification":
      return <FreeclassificationFields />;

    default:
      return <TextareaFields />;
      break;
  }
};

export const renderFormValidationSchema = (
  input: IQuestion | Record<string, any>
): React.ReactFragment => {
  switch (input.type) {
    case "input":
      return CommonFieldsSchema;
      break;
    case "number_input":
      return CommonFieldsSchema;
      break;
    case "checkbox":
      return MultipleInputFieldsSchema;
      break;
    case "radio":
      return MultipleInputFieldsSchema;
      break;
    case "select":
      return MultipleInputFieldsSchema;
      break;
    case "slider":
      return SliderSchema;
      break;
    case "text_area":
      return CommonFieldsSchema;
      break;
    case "date_picker":
      return CommonFieldsSchema;
      break;
    case "wysiwyg":
      return WysiwygSchema;

    default:
      return CommonFieldsSchema;
      break;
  }
};
