import { useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import {
  uploadLabReport,
  getLabReportsByPatient,
  downloadLabReport,
} from "../../features/labReports/api";

import LabReportUploadForm from "../../features/labReports/components/LabReportUploadForm";
import LabReportTable from "../../features/labReports/components/LabReportTable";

 
function LabReportsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

  async function loadReports(id = patientId) {
    if (!id) {
      setError("Please enter a patient ID.");
      return;
    }

    try {
      setLoadingReports(true);
      setError("");
      setSuccess("");

      const data = await getLabReportsByPatient(axiosPrivate, id);
      setReports(data);
    } catch (err) {
      console.error("Failed to load lab reports:", err);
      setError("Failed to load lab reports.");
    } finally {
      setLoadingReports(false);
    }
  }

  async function handleUpload(formData) {
    try {
      setUploading(true);
      setError("");
      setSuccess("");

      await uploadLabReport(axiosPrivate, formData);

      setSuccess("Lab report uploaded successfully.");
      setPatientId(String(formData.patientId));

      await loadReports(formData.patientId);
    } catch (err) {
      console.error("Failed to upload lab report:", err);
      setError("Failed to upload lab report.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDownload(report) {
    try {
      setDownloadingId(report.id);
      setError("");

      const blob = await downloadLabReport(axiosPrivate, report.id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = report.originalFileName || `lab-report-${report.id}`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download lab report:", err);
      setError("Failed to download lab report.");
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lab Reports"
        subtitle="Upload, view, and download patient lab reports"
      />

      {error ? (
        <Card>
          <p className="font-medium text-[#dc2626]">{error}</p>
        </Card>
      ) : null}

      {success ? (
        <Card>
          <p className="font-medium text-[#2f6b3f]">{success}</p>
        </Card>
      ) : null}

      <LabReportUploadForm onSubmit={handleUpload} loading={uploading} />

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-bold text-[#1f2933]">Find Reports</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Enter a patient ID to load reports
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="w-full md:max-w-xs">
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Patient ID
            </label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className={inputClass}
            />
          </div>

          <button
            type="button"
            disabled={loadingReports}
            onClick={() => loadReports()}
            className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingReports ? "Loading..." : "Load Reports"}
          </button>
        </div>
      </Card>

      <LabReportTable
        reports={reports}
        onDownload={handleDownload}
        downloadingId={downloadingId}
      />
    </div>
  );
}

export default LabReportsPage;