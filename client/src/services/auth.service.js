

import { loginAPI, signupAPI, googleLoginAPI } from "../api/auth.api";

export const signupUser = async (data) => {
  // later: transform data, validation, analytics, etc.
  return await signupAPI(data);
};

export const loginUser = async (data) => {
  return await loginAPI(data);
};
export const googleLogin = async (data) => {
  return await googleLoginAPI(data);
};