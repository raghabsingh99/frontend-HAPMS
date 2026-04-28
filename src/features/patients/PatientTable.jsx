import Card from "../../component/ui/Card";
import { Link } from "react-router-dom";

function PatientTable({ patients }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Patients List</h3>
          <p className="mt-1 text-sm text-slate-400">
            Registered patient records from the system
          </p>
        </div>

        <span className="rounded-xl border border-white/8 bg-white/6 px-3 py-1 text-xs text-slate-300">
          Total: {patients.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-slate-400">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Age</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Phone</th>
              <th className="pb-2 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="rounded-2xl bg-white/4"
              >
                <td className="rounded-l-2xl px-3 py-4 text-sm text-white">
                  {patient.id}
                </td>
                <td className="px-3 py-4 text-sm text-white">
                  {patient.name}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {patient.age}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {patient.email || "-"}
                </td>
                <td className="rounded-r-2xl px-3 py-4 text-sm text-slate-300">
                  {patient.phone || "-"}
                </td>
                <td className="rounded-r-2xl px-3 py-4">
                <Link
                  to={`/patients/${patient.id}`}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95"
                >
                  View
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default PatientTable;