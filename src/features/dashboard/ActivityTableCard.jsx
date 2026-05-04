import Card from "../../component/ui/Card";

function getStatusClass(status) {
  if (status === "BOOKED") return "bg-[#e0f2fe] text-[#0284c7]";
  if (status === "COMPLETED") return "bg-[#e8f3df] text-[#2f6b3f]";
  if (status === "CANCELED") return "bg-[#fee2e2] text-[#dc2626]";
  return "bg-[#f3f4f6] text-[#6b7280]";
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function ActivityTableCard({ appointments = [] }) {
  return (
    <Card className="h-full">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-[#1f2933]">Patients Activities</h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Recent appointment activity from backend
        </p>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-[#6b7280]">No recent appointment activity found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-sm text-[#6b7280]">
                <th className="pb-2 font-semibold">Appointment ID</th>
                <th className="pb-2 font-semibold">Doctor</th>
                <th className="pb-2 font-semibold">Patient ID</th>
                <th className="pb-2 font-semibold">Date & Time</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="bg-[#f8f6ef]">
                  <td className="rounded-l-2xl px-3 py-4 text-sm font-semibold text-[#1f2933]">
                    {appointment.id}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {appointment.doctorName || "-"}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {appointment.patientId}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {formatDateTime(appointment.appointmentDateTime)}
                  </td>
                  <td className="rounded-r-2xl px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default ActivityTableCard;