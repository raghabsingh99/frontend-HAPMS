import { useState } from "react";
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

function AppointmentTable({ appointments, onUpdateStatus, updatingId }) {
  const [selectedStatuses, setSelectedStatuses] = useState({});

  function handleStatusChange(appointmentId, value) {
    setSelectedStatuses((prev) => ({
      ...prev,
      [appointmentId]: value,
    }));
  }

  function getNextStatus(appointment) {
    return selectedStatuses[appointment.id] || "COMPLETED";
  }

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Appointments List
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Manage booked, completed, and canceled appointments
          </p>
        </div>

        <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          Total: {appointments.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-slate-600">
              <th className="pb-2 font-semibold">ID</th>
              <th className="pb-2 font-semibold">Date & Time</th>
              <th className="pb-2 font-semibold">Doctor</th>
              <th className="pb-2 font-semibold">Doctor ID</th>
              <th className="pb-2 font-semibold">Patient ID</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="rounded-2xl bg-[#fbfaf6] shadow-sm"
              >
                <td className="rounded-l-2xl px-3 py-4 text-sm font-medium text-slate-800">
                  {appointment.id}
                </td>
                <td className="px-3 py-4 text-sm text-slate-700">
                  {formatDateTime(appointment.appointmentDateTime)}
                </td>
                <td className="px-3 py-4 text-sm font-medium text-slate-800">
                  {appointment.doctorName || "-"}
                </td>
                <td className="px-3 py-4 text-sm text-slate-700">
                  {appointment.doctorId}
                </td>
                <td className="px-3 py-4 text-sm text-slate-700">
                  {appointment.patientId}
                </td>
                <td className="px-3 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="rounded-r-2xl px-3 py-4">
                  {appointment.status === "BOOKED" ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={getNextStatus(appointment)}
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-600"
                      >
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>

                      <button
                        type="button"
                        disabled={updatingId === appointment.id}
                        onClick={() =>
                          onUpdateStatus(
                            appointment.id,
                            getNextStatus(appointment)
                          )
                        }
                        className="rounded-xl bg-[#123f24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d321c] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingId === appointment.id
                          ? "Updating..."
                          : "Update"}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">
                      No action available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default AppointmentTable;