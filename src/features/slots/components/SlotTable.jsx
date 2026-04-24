import Card from "../../../component/ui/Card";
function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function SlotTable({ slots }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Available Slots</h3>
          <p className="mt-1 text-sm text-slate-400">
            Slots currently available for booking
          </p>
        </div>

        <span className="rounded-xl border border-white/8 bg-white/6 px-3 py-1 text-xs text-slate-300">
          Total: {slots.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-slate-400">
              <th className="pb-2 font-medium">Slot ID</th>
              <th className="pb-2 font-medium">Doctor ID</th>
              <th className="pb-2 font-medium">Start Time</th>
              <th className="pb-2 font-medium">End Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} className="rounded-2xl bg-white/4">
                <td className="rounded-l-2xl px-3 py-4 text-sm text-white">
                  {slot.id}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {slot.doctorId ?? "-"}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {formatDateTime(slot.startTime)}
                </td>
                <td className="px-3 py-4 text-sm text-slate-300">
                  {formatDateTime(slot.endTime)}
                </td>
                <td className="rounded-r-2xl px-3 py-4">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    {slot.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default SlotTable;