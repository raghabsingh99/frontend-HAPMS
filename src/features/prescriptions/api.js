export async function createPrescription(apiClient, payload) {
  const response = await apiClient.post("/prescription", payload);
  return response.data;
}