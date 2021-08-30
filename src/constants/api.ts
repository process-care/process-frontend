export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV!
    : process.env.REACT_APP_API_URL!;

export const API_URL_ROOT =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_ROOT_DEV!
    : process.env.REACT_APP_API_URL_ROOT_PROD!;

export const DEV_SURVEY = process.env.REACT_APP_DEV_SURVEY || "";
