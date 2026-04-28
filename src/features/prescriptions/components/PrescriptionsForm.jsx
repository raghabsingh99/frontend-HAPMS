import { useState } from "react";
import Card from "../../../component/ui/Card";

function PrescriptionForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    appointmentId: "",
    notes: "",
    medications: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      appointmentId: Number(form.appointmentId),
      notes: form.notes,
      medications: form.medications,
    });

    setForm({
      appointmentId: "",
      notes: "",
      medications: "",
    });
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Create Prescription</h3>
        <p className="mt-1 text-sm text-slate-400">
          Prescriptions can only be created for completed appointments
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Appointment ID
          </label>
          <input
            type="number"
            name="appointmentId"
            value={form.appointmentId}
            onChange={handleChange}
            placeholder="Enter completed appointment ID"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Enter prescription notes"
            rows="4"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Medications
          </label>
          <textarea
            name="medications"
            value={form.medications}
            onChange={handleChange}
            placeholder="Enter medications"
            rows="4"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Prescription"}
        </button>
      </form>
    </Card>
  );
}

export default PrescriptionForm;