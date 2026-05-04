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
          <h3 className="text-lg font-bold text-[#1f2933]">Available Slots</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Slots currently available for booking
          </p>
        </div>

        <span className="rounded-xl border border-[#e7e2d6] bg-[#f5f3ec] px-3 py-1 text-xs font-semibold text-[#374151]">
          Total: {slots.length}
        </span>
      </div>

      {slots.length === 0 ? (
        <p className="text-sm text-[#6b7280]">No available slots found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-separate border-spacing-y-2 text-left">
            <thead>
              <tr className="text-sm text-[#6b7280]">
                <th className="pb-2 font-semibold">Slot ID</th>
                <th className="pb-2 font-semibold">Doctor ID</th>
                <th className="pb-2 font-semibold">Start Time</th>
                <th className="pb-2 font-semibold">End Time</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className="bg-[#f8f6ef]">
                  <td className="rounded-l-2xl px-3 py-4 text-sm font-semibold text-[#1f2933]">
                    {slot.id}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {slot.doctor?.id ?? slot.doctorId ?? "-"}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {formatDateTime(slot.startTime)}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#374151]">
                    {formatDateTime(slot.endTime)}
                  </td>

                  <td className="rounded-r-2xl px-3 py-4">
                    <span className="rounded-full bg-[#e8f3df] px-3 py-1 text-xs font-semibold text-[#2f6b3f]">
                      {slot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default SlotTable;