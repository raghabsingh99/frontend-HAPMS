export async function searchAppointments(apiClient, payload = {}) {
  const response = await apiClient.post("/appointment/search", payload);
  return response.data;
}