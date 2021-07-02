import { Box } from "@chakra-ui/react";
import { SvgHover } from "components/SvgHover";
import IQuestion from "interfaces/form/question";
import React from "react";

interface Props {
  type: IQuestion["type"];
}

import { ReactComponent as Checkbox } from "./assets/checkbox.svg";
import { ReactComponent as Cursor } from "./assets/cursor.svg";
import { ReactComponent as DatePicker } from "./assets/date-picker.svg";
import { ReactComponent as FreeClassification } from "./assets/free-classification.svg";
import { ReactComponent as InputNumber } from "./assets/input-number.svg";
import { ReactComponent as Radio } from "./assets/radio.svg";
import { ReactComponent as Select } from "./assets/select.svg";
import { ReactComponent as TextArea } from "./assets/text-area.svg";
import { ReactComponent as Wysiwyg } from "./assets/wysiwyg.svg";

// TODO replace string by SVG orperator.
export const renderInput = (type: IQuestion["type"]): React.ReactElement => {
  switch (type) {
    case "checkbox":
      return <Checkbox />;
      break;
    case "slider":
      return <Cursor />;
      break;
    case "date_picker":
      return <DatePicker />;
      break;
    case "free_classification":
      return <FreeClassification />;
      break;
    case "number_input":
      return <InputNumber />;
      break;
    case "radio":
      return <Radio />;
      break;
    case "select":
      return <Select />;
      break;
    case "text_area":
      return <TextArea />;
      break;
    case "wysiwyg":
      return <Wysiwyg />;
      break;

    default:
      return <TextArea />;
      break;
  }
};

export const InputIcon: React.FC<Props> = ({ type }) => {
  return (
    <Box>
      <SvgHover>{renderInput(type)}</SvgHover>
    </Box>
  );
};
