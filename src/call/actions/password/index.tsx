import axios from "axios";

import { API_URL_ROOT } from "constants/api";
import { getHeaders } from "..";

const config = {
  headers: getHeaders()?.headers,
  "Content-Type": "application/json",
};

export const changePassword: any = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  const res = await axios.post(
    `${API_URL_ROOT}/password/change-password`,
    {
      currentPassword,
      newPassword,
      confirmNewPassword,
    },
    config
  );
  return res;
};
