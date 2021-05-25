import Inputs from "interfaces/inputs";
import {
  TextareaFields,
  CheckboxFields,
  InputFields,
  NumberInputFields,
  RadioboxFields,
  SelectFields,
  SliderFields,
  DatepickerFields,
} from "../Template";
import {
  CommonFieldsSchema,
  MultipleInputFieldsSchema,
  SliderSchema,
} from "../ValidationSchemas";

export const renderFormTemplate = (input: Inputs): React.ReactNode => {
  switch (input.type) {
    case "input":
      return <InputFields />;
      break;
    case "number-input":
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
    case "text-area":
      return <TextareaFields />;
      break;
    case "date-picker":
      return <DatepickerFields />;
      break;

    default:
      return <TextareaFields />;
      break;
  }
};

export const renderFormValidationSchema = (
  input: Inputs
): React.ReactFragment => {
  switch (input.type) {
    case "input":
      return CommonFieldsSchema;
      break;
    case "number-input":
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
    case "text-area":
      return CommonFieldsSchema;
      break;
    case "date-picker":
      return CommonFieldsSchema;
      break;

    default:
      return CommonFieldsSchema;
      break;
  }
};
