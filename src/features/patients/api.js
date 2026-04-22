export async function getPatients(apiClient) {
  const response = await apiClient.get("/patient");
  return response.data;
}

export async function createPatient(apiClient,payload) {
  const response = await apiClient.post("/patient", payload);
  return response.data;
  
}