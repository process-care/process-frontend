import { QuestionRedux } from "redux/slices/types";
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
  AssociatedClassificationFields,
  MonoThumbnailFields,
} from "../Template";
import {
  CommonFieldsSchema,
  MultipleInputFieldsSchema,
  SliderSchema,
  WysiwygSchema,
  AssociatedSchema,
} from "../ValidationSchemas";

export const renderFormTemplate = (
  input: QuestionRedux | Record<string, any>
): React.ReactNode => {
  switch (input?.attributes?.type) {
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
    case "associated_classification":
      return <AssociatedClassificationFields />;
    case "mono_thumbnail":
      return <MonoThumbnailFields />;
    default:
      return <TextareaFields />;
      break;
  }
};

export const renderFormValidationSchema = (
  input: QuestionRedux | Record<string, any>
): React.ReactFragment => {
  switch (input?.attributes?.type) {
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
    case "associated_classification":
      return AssociatedSchema;

    default:
      return CommonFieldsSchema;
      break;
  }
};

export const getDiff = (
  newValues: Record<string, any>,
  oldValues: Record<string, any>
): Record<string, any> =>
  Object.keys(newValues).reduce((diff, key) => {
    if (oldValues[key] === newValues[key]) return diff;
    return {
      ...diff,
      [key]: newValues[key],
    };
  }, {});

export const removeEmpty = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};
