import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { useTenantStore } from "@/stores/tenant.store";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Attach token + tenant headers
http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const tenantId = useTenantStore.getState().tenantId;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenantId) {
    config.headers["X-Tenant-ID"] = tenantId;
  }

  return config;
});

// Handle 401 and refresh token if needed
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // attempt refresh
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data?.accessToken;

        if (newToken) {
          useAuthStore.getState().setToken(newToken);

          // retry the request
          original.headers.Authorization = `Bearer ${newToken}`;
          return http(original);
        }
      } catch (refreshErr) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
