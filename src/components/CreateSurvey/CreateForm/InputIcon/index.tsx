import { Box } from "@chakra-ui/react";
import Image from "next/image";

import SvgHover from "@/components/SvgHover";
import { Enum_Question_Type, Maybe } from "@/api/graphql/types.generated";

import Checkbox from "./assets/checkbox.svg";
import Cursor from "./assets/cursor.svg";
import DatePicker from "./assets/date-picker.svg";
import FreeClassification from "./assets/free-classification.svg";
import InputNumber from "./assets/input-number.svg";
import Radio from "./assets/radio.svg";
import Select from "./assets/select.svg";
import TextArea from "./assets/text-area.svg";
import Wysiwyg from "./assets/wysiwyg.svg";

interface Props {
  type: Maybe<Enum_Question_Type> | undefined;
}

// TODO replace string by SVG orperator.
export const renderInput = (type: Props["type"]): React.ReactElement => {
  switch (type) {
    case "checkbox": return <Image src={Checkbox} alt="Checkbox" />
    case "slider": return <Image src={Cursor} alt="Cursor" />
    case "date_picker": return <Image src={DatePicker} alt="Date Picker" />
    case "free_classification": return <Image src={FreeClassification} alt="Free Classification" />
    case "number_input": return <Image src={InputNumber} alt="Number Input" />
    case "radio": return <Image src={Radio} alt="Radio" />
    case "select": return <Image src={Select} alt="Select" />
    case "text_area": return <Image src={TextArea} alt="Text Area" />
    case "wysiwyg": return <Image src={Wysiwyg} alt="Wysiwyg" />

    default:
      return <Image src={TextArea} alt="Text Area" />
  }
};

export default function InputIcon({ type }: Props): JSX.Element {
  return (
    <Box>
      <SvgHover>{renderInput(type)}</SvgHover>
    </Box>
  );
};
