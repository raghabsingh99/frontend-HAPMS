import { useState } from "react";
import Card from "../../component/ui/Card";

function getStatusClass(status) {
  if (status === "BOOKED") return "bg-sky-500/15 text-sky-300";
  if (status === "COMPLETED") return "bg-emerald-500/15 text-emerald-300";
  if (status === "CANCELED") return "bg-red-500/15 text-red-300";
  return "bg-slate-500/15 text-slate-300";
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
          <h3 className="text-lg font-semibold text-white">Appointments List</h3>
          <p className="mt-1 text-sm text-slate-400">
            Manage booked, completed, and canceled appointments
          </p>
        </div>

        <span className="rounded-xl border border-white/8 bg-white/6 px-3 py-1 text-xs text-slate-300">
          Total: {appointments.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-slate-400">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Date & Time</th>
              <th className="pb-2 font-medium">Doctor</th>
              <th className="pb-2 font-medium">Doctor ID</th>
              <th className="pb-2 font-medium">Patient ID</th>
              <th className="pb-2 font-medium">Status</th>
               <th className="pb-2 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="rounded-2xl bg-white/4">
                <td className="rounded-l-2xl px-3 py-4 text-sm text-white">
                  {appointment.id}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {formatDateTime(appointment.appointmentDateTime)}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {appointment.doctorName || "-"}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {appointment.doctorId}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {appointment.patientId}
                </td>
                <td className="rounded-r-2xl px-3 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
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
                        className="rounded-xl border border-white/10 bg-[#1b2340] px-3 py-2 text-sm text-white outline-none focus:border-blue-400/60"
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
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingId === appointment.id ? "Updating..." : "Update"}
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