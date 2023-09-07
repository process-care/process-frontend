import { Box } from "@chakra-ui/react"

import SvgHover from "@/components/SvgHover/index.tsx"
import { Enum_Question_Type, Maybe } from "@/api/graphql/types.generated.ts"
import * as Symbols from "./InputSymbols.tsx"

interface Props {
  type: Maybe<Enum_Question_Type> | undefined;
}

// TODO replace string by SVG orperator.
export const renderInput = (type: Props["type"]): React.ReactElement => {
  switch (type) {
    case "checkbox": return <Symbols.CheckboxSymbol />
    case "slider": return <Symbols.CursorSymbol />
    case "date_picker": return <Symbols.DatePickerSymbol />
    case "free_classification": return <Symbols.FreeClassificationSymbol />
    case "number_input": return <Symbols.InputNumberSymbol />
    case "radio": return <Symbols.RadioSymbol />
    case "select": return <Symbols.SelectSymbol />
    case "text_area": return <Symbols.TextAreaSymbol />
    case "wysiwyg": return <Symbols.WysiwygSymbol />

    default:
      return <Symbols.TextAreaSymbol />
  }
};

export default function InputIcon({ type }: Props): JSX.Element {
  return (
    <Box>
      <SvgHover>{renderInput(type)}</SvgHover>
    </Box>
  );
};
