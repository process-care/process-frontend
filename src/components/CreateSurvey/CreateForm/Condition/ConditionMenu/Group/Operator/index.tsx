import { Box } from "@chakra-ui/react";
import { ConditionRedux } from "@/redux/slices/types";
import Image from "next/image";

import Different from "./../assets/different.svg";
import Equal from "./../assets/equal.svg";
import Infequal from "./../assets/infequal.svg";
import Inferior from "./../assets/inferior.svg";
import Supequal from "./../assets/supequal.svg";
import Superior from "./../assets/superior.svg";

interface Props {
  condition: ConditionRedux;
}

export const renderOperator = (
  operators: ConditionRedux["attributes"]["operator"] | undefined
): React.ReactElement | string | undefined => {
  switch (operators) {
    case "not_equal": return <Image src={Different} alt="Different operator" />
    case "equal": return <Image src={Equal} alt="Equal operator" />
    case "equal_or_inferior": return <Image src={Infequal} alt="Equal or inferior operator" />
    case "equal_or_superior": return <Image src={Supequal} alt="Equal or superior operator" />
    case "inferior": return <Image src={Inferior} alt="Inferior operator" />
    case "superior": return <Image src={Superior} alt="Superior operator" />

    default:
      return ""
  }
};

export default function Operator({ condition }: Props): JSX.Element {
  return <Box>{renderOperator(condition?.attributes?.operator)}</Box>;
};
