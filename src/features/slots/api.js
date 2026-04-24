export async function createSlot(apiClient, payload) {
  const response = await apiClient.post("/slots", payload);
  return response.data;
}

export async function getAvailableSlots(apiClient, doctorId) {
  const response = await apiClient.get(`/slots/doctor/${doctorId}/available`);
  return response.data;
}

export async function generateWeeklySlots(apiClient, payload) {
  const response = await apiClient.post("/schedule/doctor/weekly-slots", payload);
  return response.data;
}