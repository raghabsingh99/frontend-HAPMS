import api from "../../services/axios";

export async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function logoutUser(apiClient, refreshToken) {
  const response = await apiClient.post("/auth/logout", {
    refreshToken,
  });

  return response.data;
}

export async function refreshAccessToken(refreshToken) {
  const response = await api.post("/auth/refresh", {
    refreshToken,
  });

  return response.data;
}