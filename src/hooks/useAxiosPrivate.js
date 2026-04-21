import { useEffect } from "react";
import api from "../services/axios";
import { useAuth } from "./useAuth";

export function useAxiosPrivate() {
  const { accessToken } = useAuth();

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

    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken]);

  return api;
}