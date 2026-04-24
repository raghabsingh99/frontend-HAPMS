import { useState } from "react";
import Card from "../../../component/ui/Card";

function SlotForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    doctorId: "",
    startTime: "",
    endTime: "",
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
      doctorId: Number(form.doctorId),
      startTime: form.startTime,
      endTime: form.endTime,
    });

    setForm({
      doctorId: "",
      startTime: "",
      endTime: "",
    });
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Create Slot</h3>
        <p className="mt-1 text-sm text-slate-400">
          Add a single available slot for a doctor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Doctor ID
          </label>
          <input
            type="number"
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/8"
            required
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving Slot..." : "Save Slot"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default SlotForm;