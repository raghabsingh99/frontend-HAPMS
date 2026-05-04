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

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

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
        <h3 className="text-lg font-bold text-[#1f2933]">
          Generate Weekly Schedule
        </h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Create recurring available slots for a doctor in bulk
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              type="time"
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
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Slot Minutes
            </label>
            <input
              type="number"
              name="slotMinutes"
              value={form.slotMinutes}
              onChange={handleChange}
              placeholder="e.g. 30"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Weeks Ahead
            </label>
            <input
              type="number"
              name="weeksAhead"
              value={form.weeksAhead}
              onChange={handleChange}
              placeholder="e.g. 2"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-[#374151]">
            Working Days
          </label>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
            {weekDays.map((day) => {
              const checked = form.days.includes(day);

              return (
                <label
                  key={day}
                  className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    checked
                      ? "border-[#2f6b3f] bg-[#e8f3df] text-[#2f6b3f]"
                      : "border-[#e7e2d6] bg-[#fbfaf6] text-[#374151] hover:bg-[#f5f3ec]"
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
            className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Schedule"}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default WeeklyScheduleForm;