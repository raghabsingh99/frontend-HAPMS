import Card from "../../../component/ui/Card";

function formatFileSize(bytes) {
  if (!bytes) return "-";

  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function LabReportTable({ reports, onDownload, downloadingId }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1f2933]">Lab Reports</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Uploaded reports for the selected patient
          </p>
        </div>

        <span className="rounded-xl border border-[#e7e2d6] bg-[#f5f3ec] px-3 py-1 text-xs font-semibold text-[#374151]">
          Total: {reports.length}
        </span>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-[#6b7280]">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-sm text-[#6b7280]">
                <th className="pb-2 font-semibold">Report ID</th>
                <th className="pb-2 font-semibold">Patient ID</th>
                <th className="pb-2 font-semibold">Appointment ID</th>
                <th className="pb-2 font-semibold">File Name</th>
                <th className="pb-2 font-semibold">Type</th>
                <th className="pb-2 font-semibold">Size</th>
                <th className="pb-2 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="bg-[#f8f6ef]">
                  <td className="rounded-l-2xl px-3 py-4 text-sm font-semibold text-[#1f2933]">
                    {report.id}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {report.patientId}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {report.appointmentId || "-"}
                  </td>

                  <td className="px-3 py-4 text-sm font-semibold text-[#1f2933]">
                    {report.originalFileName}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {report.contentType || "-"}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {formatFileSize(report.size)}
                  </td>

                  <td className="rounded-r-2xl px-3 py-4">
                    <button
                      type="button"
                      disabled={downloadingId === report.id}
                      onClick={() => onDownload(report)}
                      className="rounded-xl bg-[#17351f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {downloadingId === report.id ? "Downloading..." : "Download"}
                    </button>
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

export default LabReportTable;