export async function getBookedPerDoctorReport(apiClient) {
  const response = await apiClient.get("/appointment/reports/booked-per-doctor");
  return response.data;
}

export async function exportPatientsCsv(apiClient) {
  const response = await apiClient.get("/lab-reports/export/patient.csv", {
    responseType: "blob",
  });

  return response.data;
}