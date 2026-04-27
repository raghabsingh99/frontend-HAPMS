import { useState } from "react";
import Card from "../../../component/ui/Card";

function LabReportUploadForm({ onSubmit, loading }) {
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      patientId: Number(patientId),
      appointmentId: appointmentId ? Number(appointmentId) : null,
      file,
    });

    setPatientId("");
    setAppointmentId("");
    setFile(null);
    e.target.reset();
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Upload Lab Report</h3>
        <p className="mt-1 text-sm text-slate-400">
          Upload a lab report file for a patient
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Patient ID
          </label>
          <input
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient ID"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Appointment ID
          </label>
          <input
            type="number"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-slate-300 outline-none file:mr-3 file:rounded-xl file:border-0 file:bg-blue-500/20 file:px-3 file:py-2 file:text-blue-300"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || !file}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default LabReportUploadForm;