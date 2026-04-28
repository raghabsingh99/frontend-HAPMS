export async function getPatients(apiClient) {
  const response = await apiClient.get("/patient");
  return response.data;
}

export async function createPatient(apiClient, payload) {
  const response = await apiClient.post("/patient", payload);
  return response.data;
}

export async function getPatientById(apiClient, id) {
  const response = await apiClient.get(`/patient/${id}`);
  return response.data;
}

export async function getPatientAllergies(apiClient, patientId) {
  const response = await apiClient.get(`/patient/clinical/${patientId}/allergies`);
  return response.data;
}

export async function addPatientAllergy(apiClient, patientId, name) {
  const response = await apiClient.post(
    `/patient/clinical/${patientId}/allergies`,
    name,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  return response.data;
}

export async function getPatientHistory(apiClient, patientId) {
  const response = await apiClient.get(`/patient/clinical/${patientId}/history`);
  return response.data;
}

export async function addPatientHistory(apiClient, patientId, payload) {
  const response = await apiClient.post(
    `/patient/clinical/${patientId}/history`,
    payload
  );
  return response.data;
}