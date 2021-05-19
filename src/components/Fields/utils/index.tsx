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
