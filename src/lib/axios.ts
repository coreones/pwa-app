import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getClientCookie, setClientCookie } from "./cookies";
import { ApiResponse } from "@/types/api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getClientCookie("accessToken");

    if (token) {
      if (!config.headers) config.headers = new axios.AxiosHeaders();
      if (!(config.headers instanceof axios.AxiosHeaders)) {
        config.headers = new axios.AxiosHeaders(config.headers);
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and refresh token
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalConfig = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const refreshToken = getClientCookie("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post<ApiResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          setClientCookie("accessToken", data.data?.accessToken, { path: "/" });

          if (!originalConfig.headers)
            originalConfig.headers = new axios.AxiosHeaders();
          if (!(originalConfig.headers instanceof axios.AxiosHeaders)) {
            originalConfig.headers = new axios.AxiosHeaders(
              originalConfig.headers
            );
          }
          originalConfig.headers.set(
            "Authorization",
            `Bearer ${data.data?.accessToken}`
          );

          return axios(originalConfig);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
