export async function getDashboardStats(apiClient) {
  const response = await apiClient.get("/admin/dashboard/stats");
  return response.data;
}