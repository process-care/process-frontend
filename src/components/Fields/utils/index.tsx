export const getRows = (size: string | undefined): number => {
  switch (size) {
    case "small":
      return 1;
      break;
    case "medium":
      return 3;
      break;
    case "large":
      return 10;
      break;

    default:
      return 5;
      break;
  }
};

export const getMaxLength = (size: string | undefined): number => {
  switch (size) {
    case "small":
      return 50;
      break;
    case "medium":
      return 500;
      break;
    case "large":
      return 5000;
      break;

    default:
      return 50;
      break;
  }
};
