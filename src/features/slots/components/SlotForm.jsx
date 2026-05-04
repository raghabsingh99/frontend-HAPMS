import { useState } from "react";
import Card from "../../../component/ui/Card";

function SlotForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    doctorId: "",
    startTime: "",
    endTime: "",
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
        <h3 className="text-lg font-bold text-[#1f2933]">Create Slot</h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Add a single available slot for a doctor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Doctor ID
          </label>
          <input
            type="number"
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving Slot..." : "Save Slot"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default SlotForm;