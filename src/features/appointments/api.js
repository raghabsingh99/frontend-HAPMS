export async function searchAppointments(apiClient, payload = {}) {
  const response = await apiClient.post("/appointment/search", payload);
  return response.data;
}

export async function updateAppointmentStatus(apiClient, appointmentId, status) {
  const response = await apiClient.patch(`/appointment/${appointmentId}/status`, {
    status,
  });
  return response.data;
}