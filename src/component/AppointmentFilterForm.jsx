import { useState } from "react";
import Card from "./ui/Card";

function AppointmentFilterForm({ onSearch, onReset, loading }) {
  const [filters, setFilters] = useState({
    doctorId: "",
    patientId: "",
    status: "",
    from: "",
    to: "",
  });

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

  function handleChange(e) {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function buildPayload() {
    const payload = {};

    if (filters.doctorId) payload.doctorId = Number(filters.doctorId);
    if (filters.patientId) payload.patientId = Number(filters.patientId);
    if (filters.status) payload.status = filters.status;
    if (filters.from) payload.from = filters.from;
    if (filters.to) payload.to = filters.to;

    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onSearch(buildPayload());
  }

  async function handleReset() {
    setFilters({
      doctorId: "",
      patientId: "",
      status: "",
      from: "",
      to: "",
    });

    await onReset();
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-bold text-[#1f2933]">Filter Appointments</h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          Search appointments by doctor, patient, status, or date range
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Doctor ID
          </label>
          <input
            type="number"
            name="doctorId"
            value={filters.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Patient ID
          </label>
          <input
            type="number"
            name="patientId"
            value={filters.patientId}
            onChange={handleChange}
            placeholder="Enter patient ID"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">All Statuses</option>
            <option value="BOOKED">BOOKED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            From
          </label>
          <input
            type="datetime-local"
            name="from"
            value={filters.from}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#374151]">
            To
          </label>
          <input
            type="datetime-local"
            name="to"
            value={filters.to}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3 pt-2 md:col-span-2 xl:col-span-5">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border border-[#e7e2d6] bg-white px-5 py-3 font-semibold text-[#374151] transition hover:bg-[#f5f3ec]"
          >
            Reset
          </button>
        </div>
      </form>
    </Card>
  );
}

export default AppointmentFilterForm;