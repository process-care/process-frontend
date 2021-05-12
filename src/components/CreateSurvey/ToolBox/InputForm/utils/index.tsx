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
