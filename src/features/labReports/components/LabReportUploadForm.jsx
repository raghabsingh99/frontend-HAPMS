import { useState } from "react";
import Card from "../../../component/ui/Card";

function LabReportUploadForm({ onSubmit, loading }) {
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [file, setFile] = useState(null);

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

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
        <h3 className="text-lg font-bold text-[#1f2933]">Upload Lab Report</h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Upload a lab report file for a patient
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Patient ID
          </label>
          <input
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient ID"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Appointment ID
          </label>
          <input
            type="number"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Optional"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-2.5 text-sm text-[#374151] outline-none file:mr-3 file:rounded-xl file:border-0 file:bg-[#e8f3df] file:px-3 file:py-2 file:font-semibold file:text-[#2f6b3f]"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || !file}
            className="w-full rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default LabReportUploadForm;