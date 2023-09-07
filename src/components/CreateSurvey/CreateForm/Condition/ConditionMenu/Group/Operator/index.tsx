import { Box } from "@chakra-ui/react";
import { ConditionRedux } from "@/redux/slices/types/index.js"

import * as Operators from "./Symbols.tsx"

// ---- TYPES

interface Props {
  condition: ConditionRedux;
}

// ---- COMPONENT

export const renderOperator = (
  operators: ConditionRedux["attributes"]["operator"] | undefined
): React.ReactElement | string | undefined => {
  switch (operators) {
    case "not_equal": return <Operators.DifferentSymbol />
    case "equal": return <Operators.EqualSymbol />
    case "equal_or_inferior": return <Operators.InfequalSymbol />
    case "equal_or_superior": return <Operators.SupequalSymbol />
    case "inferior": return <Operators.InferiorSymbol />
    case "superior": return <Operators.SuperiorSymbol />

    default:
      return ""
  }
};

export default function Operator({ condition }: Props): JSX.Element {
  return <Box>{renderOperator(condition?.attributes?.operator)}</Box>;
};
