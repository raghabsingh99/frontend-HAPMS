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
      console.log("Backend error response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load lab reports."
      );
    } finally {
      setLoadingReports(false);
    }
  }

  async function handleUpload(payload) {
    try {
      setUploading(true);
      setError("");
      setSuccess("");

      // CORRECTION: backend expects patientId, appointmentId, and file as form-data
      await uploadLabReport(axiosPrivate, payload);

      setSuccess("Lab report uploaded successfully.");

      // CORRECTION: after upload, refresh reports for that patient
      if (payload.patientId) {
        setPatientId(String(payload.patientId));
        await loadReports(payload.patientId);
      }
    } catch (err) {
      console.error("Failed to upload lab report:", err);
      console.log("Backend error response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to upload lab report."
      );
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

    let message = "Failed to download lab report.";

    // CORRECTION: handle 404 file missing case from backend
    if (err.response?.status === 404) {
      message =
        "Lab report file is missing from server. Please re-upload the report.";
    } else if (err.response?.data instanceof Blob) {
      const text = await err.response.data.text();
      console.log("Backend error response:", text);

      try {
        const parsed = JSON.parse(text);
        message = parsed.message || message;
      } catch {
        message = text || message;
      }
    } else {
      message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        message;
    }

    setError(message);
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
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      {success ? (
        <Card>
          <p className="text-emerald-300">{success}</p>
        </Card>
      ) : null}

      <LabReportUploadForm onSubmit={handleUpload} loading={uploading} />

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Find Reports</h3>
          <p className="mt-1 text-sm text-slate-400">
            Enter a patient ID to load reports
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="w-full md:max-w-xs">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Patient ID
            </label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            />
          </div>

          <button
            type="button"
            disabled={loadingReports}
            onClick={() => loadReports()}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
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