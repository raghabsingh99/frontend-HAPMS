import { Link } from "react-router-dom";
import Card from "../../component/ui/Card";

function PatientTable({ patients }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1f2933]">Patients List</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Registered patient records from the system
          </p>
        </div>

        <span className="rounded-xl border border-[#e7e2d6] bg-[#f5f3ec] px-3 py-1 text-xs font-semibold text-[#374151]">
          Total: {patients.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-[#6b7280]">
              <th className="pb-2 font-semibold">ID</th>
              <th className="pb-2 font-semibold">Name</th>
              <th className="pb-2 font-semibold">Age</th>
              <th className="pb-2 font-semibold">Email</th>
              <th className="pb-2 font-semibold">Phone</th>
              <th className="pb-2 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="bg-[#f8f6ef]">
                <td className="rounded-l-2xl px-3 py-4 text-sm font-semibold text-[#1f2933]">
                  {patient.id}
                </td>
                <td className="px-3 py-4 text-sm font-semibold text-[#1f2933]">
                  {patient.name}
                </td>
                <td className="px-3 py-4 text-sm text-[#374151]">{patient.age}</td>
                <td className="px-3 py-4 text-sm text-[#374151]">
                  {patient.email || "-"}
                </td>
                <td className="px-3 py-4 text-sm text-[#374151]">
                  {patient.phone || "-"}
                </td>
                <td className="rounded-r-2xl px-3 py-4">
                  <Link
                    to={`/patients/${patient.id}`}
                    className="rounded-xl bg-[#17351f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#224b2c]"
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