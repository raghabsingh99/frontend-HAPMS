import { useEffect,useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { getBookedPerDoctorReport,
    exportPatientsCsv,
 } from "../../features/reports/api";
 import DoctorBookingReportTable from "../../features/reports/components/DoctorBookingReportTable";

 

function ReportsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [reportRows, setReportRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  async function loadReport() {
    try {
      setLoading(true);
      setError("");

      const data = await getBookedPerDoctorReport(axiosPrivate);
      setReportRows(data);
    } catch (err) {
      console.error("Failed to load report:", err);
      setError("Failed to load booked-per-doctor report.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, [axiosPrivate]);

  async function handleExportPatients() {
    try {
      setExporting(true);
      setError("");

      const blob = await exportPatientsCsv(axiosPrivate);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "patients.csv";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export patients CSV:", err);
      setError("Failed to export patients CSV.");
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Reports" subtitle="Loading admin reports..." />
        <Card>
          <p className="font-medium text-[#374151]">Loading reports...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Review appointment summaries and export patient records"
      />

      {error ? (
        <Card>
          <p className="font-medium text-[#dc2626]">{error}</p>
        </Card>
      ) : null}

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1f2933]">
              Patient CSV Export
            </h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Download all patient records as a CSV file
            </p>
          </div>

          <button
            type="button"
            disabled={exporting}
            onClick={handleExportPatients}
            className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {exporting ? "Exporting..." : "Export Patients CSV"}
          </button>
        </div>
      </Card>

      <DoctorBookingReportTable rows={reportRows} />
    </div>
  );
}

export default ReportsPage;