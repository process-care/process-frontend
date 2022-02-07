import { Box } from "@chakra-ui/react";
import React from "react";
import { ConditionRedux } from "redux/slices/types";

interface Props {
  condition: ConditionRedux;
}

import { ReactComponent as Different } from "./../assets/different.svg";
import { ReactComponent as Equal } from "./../assets/equal.svg";
import { ReactComponent as Infequal } from "./../assets/infequal.svg";
import { ReactComponent as Inferior } from "./../assets/inferior.svg";
import { ReactComponent as Supequal } from "./../assets/supequal.svg";
import { ReactComponent as Superior } from "./../assets/superior.svg";

// TODO replace string by SVG orperator.
export const renderOperator = (
  operators: ConditionRedux["attributes"]["operator"] | undefined
): React.ReactElement | string | undefined => {
  switch (operators) {
    case "not_equal":
      return <Different />;
      break;
    case "equal":
      return <Equal />;
      break;
    case "equal_or_inferior":
      return <Infequal />;
      break;
    case "equal_or_superior":
      return <Supequal />;
      break;
    case "inferior":
      return <Inferior />;
      break;
    case "superior":
      return <Superior />;
      break;

    default:
      return "";
      break;
  }
};

export const Operator: React.FC<Props> = ({ condition }) => {
  return <Box>{renderOperator(condition?.attributes?.operator)}</Box>;
};
