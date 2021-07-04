import { request } from "graphql-request";
import { addPage } from "api/queries";

import IPage from "interfaces/form/page";

export const useAddPage: any = async (values: Partial<IPage>) => {
  await request(process.env.REACT_APP_API_URL_DEV!, addPage, {
    values,
  });
};
