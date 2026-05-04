import Card from "../../../component/ui/Card";

function DoctorBookingReportTable({ rows }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1f2933]">
            Booked Appointments Per Doctor
          </h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Summary of currently booked appointments grouped by doctor
          </p>
        </div>

        <span className="rounded-xl border border-[#e7e2d6] bg-[#f5f3ec] px-3 py-1 text-xs font-semibold text-[#374151]">
          Total Doctors: {rows.length}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[#6b7280]">No report data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-sm text-[#6b7280]">
                <th className="pb-2 font-semibold">Doctor Name</th>
                <th className="pb-2 font-semibold">Booked Count</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.doctorName}-${index}`} className="bg-[#f8f6ef]">
                  <td className="rounded-l-2xl px-3 py-4 text-sm font-semibold text-[#1f2933]">
                    {row.doctorName}
                  </td>

                  <td className="rounded-r-2xl px-3 py-4 text-sm font-bold text-[#2f6b3f]">
                    {row.count ?? row.bookedCount ?? row.appointmentCount ?? 0}
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

export default DoctorBookingReportTable;