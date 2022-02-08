import { Enum_Question_Rows, Maybe } from "api/graphql/types.generated";

export const getRows = (
  size: Maybe<Enum_Question_Rows> | undefined
): number => {
  switch (size) {
    case Enum_Question_Rows.Small:
      return 1;
      break;
    case Enum_Question_Rows.Medium:
      return 3;
      break;
    case Enum_Question_Rows.Large:
      return 10;
      break;

    default:
      return 5;
      break;
  }
};

export const getMaxLength = (
  size: Maybe<Enum_Question_Rows> | undefined
): number => {
  switch (size) {
    case Enum_Question_Rows.Small:
      return 50;
      break;
    case Enum_Question_Rows.Medium:
      return 500;
      break;
    case Enum_Question_Rows.Large:
      return 5000;
      break;

    default:
      return 50;
      break;
  }
};
