export const getRows = (size: string): number => {
  switch (size) {
    case "small":
      return 1;
      break;
    case "medium":
      return 5;
      break;
    case "large":
      return 10;
      break;

    default:
      return 5;
      break;
  }
};
