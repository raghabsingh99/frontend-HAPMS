export async function uploadLabReport(apiClient, payload) {
  const formData = new FormData();

  // CORRECTION: convert IDs to string before appending to FormData
  formData.append("patientId", String(payload.patientId));

  // CORRECTION: appointmentId is optional, so append only if available
  if (payload.appointmentId) {
    formData.append("appointmentId", String(payload.appointmentId));
  }

  // CORRECTION: backend expects @RequestParam("file")
  formData.append("file", payload.file);

  console.log("Uploading lab report:", {
    patientId: payload.patientId,
    appointmentId: payload.appointmentId,
    fileName: payload.file?.name,
    fileType: payload.file?.type,
  });

  const response = await apiClient.post("/lab-reports/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function getLabReportsByPatient(apiClient, patientId) {
  const response = await apiClient.get(`/lab-reports/patient/${patientId}`);
  return response.data;
}

export async function downloadLabReport(apiClient, reportId) {
  const response = await apiClient.get(`/lab-reports/${reportId}/download`, {
    responseType: "blob",
  });

  return response.data;
}