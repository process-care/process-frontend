import IOperator from "interfaces/form/operator";

// TODO replace string by SVG orperator.
export const renderOperator = (
  operators: IOperator["id"] | undefined
): string | undefined => {
  switch (operators) {
    case "different":
      return "≠";
      break;
    case "equal":
      return "=";
      break;
    case "equal_or_inferior":
      return "=<";
      break;
    case "equal_or_superior":
      return "=>";
      break;
    case "inferior":
      return "<";
      break;
    case "superior":
      return ">";
      break;

    default:
      return "";
      break;
  }
};
