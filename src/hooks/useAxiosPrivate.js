import { useEffect } from "react";
import api from "../services/axios";
import { useAuth } from "./useAuth";
import { refreshAccessToken } from "../features/Auth/api";

export function useAxiosPrivate() {
  const { accessToken, refreshToken, updateTokens, logout } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (
          error?.response?.status === 401 &&
          !originalRequest?._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;

          try {
            const data = await refreshAccessToken(refreshToken);

            const newAccessToken = data.token;
            const newRefreshToken = data.refreshToken || refreshToken;

            updateTokens({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refreshToken, updateTokens, logout]);

  return api;
}