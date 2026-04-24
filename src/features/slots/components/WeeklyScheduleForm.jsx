import { useState } from "react";
import Card from "../../../component/ui/Card";

const weekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

function WeeklyScheduleForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    doctorId: "",
    days: [],
    startTime: "",
    endTime: "",
    slotMinutes: "",
    weeksAhead: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDayChange(day) {
    setForm((prev) => {
      const exists = prev.days.includes(day);

      return {
        ...prev,
        days: exists
          ? prev.days.filter((d) => d !== day)
          : [...prev.days, day],
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      doctorId: Number(form.doctorId),
      days: form.days,
      startTime: form.startTime,
      endTime: form.endTime,
      slotMinutes: Number(form.slotMinutes),
      weeksAhead: Number(form.weeksAhead),
    });
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Generate Weekly Schedule</h3>
        <p className="mt-1 text-sm text-slate-400">
          Create recurring available slots for a doctor in bulk
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              type="time"
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
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/8"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Slot Minutes
            </label>
            <input
              type="number"
              name="slotMinutes"
              value={form.slotMinutes}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Weeks Ahead
            </label>
            <input
              type="number"
              name="weeksAhead"
              value={form.weeksAhead}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Working Days
          </label>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
            {weekDays.map((day) => {
              const checked = form.days.includes(day);

              return (
                <label
                  key={day}
                  className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    checked
                      ? "border-blue-400/50 bg-blue-500/15 text-blue-300"
                      : "border-white/10 bg-white/6 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleDayChange(day)}
                    className="hidden"
                  />
                  {day.slice(0, 3)}
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Schedule"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default WeeklyScheduleForm;