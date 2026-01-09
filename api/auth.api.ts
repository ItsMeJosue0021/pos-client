import { http } from "./http";

export const loginApi = async (payload: {
  email: string;
  password: string;
  tenantKey?: string;
}) => {
  const res = await http.post("/auth/login", payload);
  return res.data;
};

export const registerApi = async (payload: any) => {
  const res = await http.post("/auth/register", payload);
  return res.data;
};

export const logoutApi = async () => {
  const res = await http.post("/auth/logout");
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await http.post("/auth/refresh");
  return res.data;
};

export const meApi = async () => {
  const res = await http.get("/auth/me");
  return res.data;
};
