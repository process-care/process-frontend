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

export const forgotPassword: any = async (email: string) => {
  const res = await axios.post(`${API_URL_ROOT}/auth/forgot-password`, {
    email,
    url: `${API_URL_ROOT}/admin/plugins/users-permissions/auth/reset-password`,
  });
  return res;
};

export const resetPassword: any = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  const res = await axios.post(`${API_URL_ROOT}/auth/reset-password`, {
    code,
    password,
    passwordConfirmation,
  });
  if (res.status === 200) {
    return res;
  } else {
    return res.data?.message;
  }
};
