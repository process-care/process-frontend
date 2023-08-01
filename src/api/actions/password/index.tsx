import axios from "axios";

import { API_URL_ROOT } from "@/constants/api";
import { buildBearer } from "@/utils/auth";

// -- Change password

type PasswordChange = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const changePassword: any = async (passes: PasswordChange, jwt: string) => {
  // Build headers
  const headers = {
    Authorization: buildBearer(jwt),
    "Content-Type": "application/json",
  }

  // Send the request
  const res = await axios.post(
    `${API_URL_ROOT}/password/change-password`,
    passes,
    { headers },
  );

  return res;
};

// -- Forgot password

export const forgotPassword: any = async (email: string) => {
  const res = await axios.post(
    `${API_URL_ROOT}/api/auth/forgot-password`,
    { email }
  );

  return res;
};

// -- Reset password

export const resetPassword: any = async (code: string, password: string, passwordConfirmation: string) => {
  const res = await axios.post(
    `${API_URL_ROOT}/auth/reset-password`,
    { code, password, passwordConfirmation },
  );

  return (res.status === 200) ? res : res.data?.message;
};
