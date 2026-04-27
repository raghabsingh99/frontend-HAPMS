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
          <h3 className="text-lg font-semibold text-white">Lab Reports</h3>
          <p className="mt-1 text-sm text-slate-400">
            Uploaded reports for the selected patient
          </p>
        </div>

        <span className="rounded-xl border border-white/8 bg-white/6 px-3 py-1 text-xs text-slate-300">
          Total: {reports.length}
        </span>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-slate-400">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-sm text-slate-400">
                <th className="pb-2 font-medium">Report ID</th>
                <th className="pb-2 font-medium">Patient ID</th>
                <th className="pb-2 font-medium">Appointment ID</th>
                <th className="pb-2 font-medium">File Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Size</th>
                <th className="pb-2 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="rounded-2xl bg-white/4">
                  <td className="rounded-l-2xl px-3 py-4 text-sm text-white">
                    {report.id}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-300">
                    {report.patientId}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-300">
                    {report.appointmentId || "-"}
                  </td>
                  <td className="px-3 py-4 text-sm text-white">
                    {report.originalFileName}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-300">
                    {report.contentType || "-"}
                  </td>
                  <td className="px-3 py-4 text-sm text-slate-300">
                    {formatFileSize(report.size)}
                  </td>
                  <td className="rounded-r-2xl px-3 py-4">
                    <button
                      type="button"
                      disabled={downloadingId === report.id}
                      onClick={() => onDownload(report)}
                      className="rounded-xl bg-gradient-to-r from-emerald-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
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

