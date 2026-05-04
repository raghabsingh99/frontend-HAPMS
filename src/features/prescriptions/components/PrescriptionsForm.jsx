import { useState } from "react";
import Card from "../../../component/ui/Card";

function PrescriptionForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    appointmentId: "",
    notes: "",
    medications: "",
  });

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

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
        <h3 className="text-lg font-bold text-[#1f2933]">
          Create Prescription
        </h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Prescriptions can only be created for completed appointments
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Appointment ID
          </label>
          <input
            type="number"
            name="appointmentId"
            value={form.appointmentId}
            onChange={handleChange}
            placeholder="Enter completed appointment ID"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Enter prescription notes"
            rows="4"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Medications
          </label>
          <textarea
            name="medications"
            value={form.medications}
            onChange={handleChange}
            placeholder="Enter medications"
            rows="4"
            className={inputClass}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Prescription"}
        </button>
      </form>
    </Card>
  );
}

export default PrescriptionForm;