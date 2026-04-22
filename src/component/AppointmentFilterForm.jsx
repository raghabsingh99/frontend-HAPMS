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
    const emptyFilters = {
      doctorId: "",
      patientId: "",
      status: "",
      from: "",
      to: "",
    };

    setFilters(emptyFilters);
    await onReset();
  }

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Filter Appointments</h3>
        <p className="mt-1 text-sm text-slate-400">
          Search appointments by doctor, patient, status, or date range
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Doctor ID
          </label>
          <input
            type="number"
            name="doctorId"
            value={filters.doctorId}
            onChange={handleChange}
            placeholder="Enter doctor ID"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Patient ID
          </label>
          <input
            type="number"
            name="patientId"
            value={filters.patientId}
            onChange={handleChange}
            placeholder="Enter patient ID"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#1b2340] px-4 py-3 text-white outline-none transition focus:border-blue-400/60"
          >
            <option value="">All Statuses</option>
            <option value="BOOKED">BOOKED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            From
          </label>
          <input
            type="datetime-local"
            name="from"
            value={filters.from}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/8"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            To
          </label>
          <input
            type="datetime-local"
            name="to"
            value={filters.to}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/8"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-5 flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3 font-medium text-slate-300 transition hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </form>
    </Card>
  );
}

export default AppointmentFilterForm;
