import Card from "../../component/ui/Card";
const rows = [
  {
    name: "Jenny Wilson",
    dept: "Cardiology",
    date: "20/08/2024",
    ward: "CF-315",
    status: "Released",
  },
  {
    name: "Jane Cooper",
    dept: "Neurology",
    date: "10/02/2025",
    ward: "WM-119",
    status: "Admitted",
  },
  {
    name: "Robert Fox",
    dept: "Orthopedics",
    date: "03/05/2025",
    ward: "XR-220",
    status: "Pending",
  },
  
];

function getStatusClass(status) {
  if (status === "Released") return "bg-emerald-500/15 text-emerald-300";
  if (status === "Admitted") return "bg-amber-500/15 text-amber-300";
  return "bg-sky-500/15 text-sky-300";
}

function ActivityTableCard() {
  return (
    <Card className="h-full">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Patients Activities</h3>
        <p className="mt-1 text-sm text-slate-400">Recent hospital activity records</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-sm text-slate-400">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Dept.</th>
              <th className="pb-2 font-medium">Admission Date</th>
              <th className="pb-2 font-medium">Ward/Cabin</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.name}-${row.date}`} className="rounded-2xl bg-white/4">
                <td className="rounded-l-2xl px-3 py-4 text-sm text-white">{row.name}</td>
                <td className="px-3 py-4 text-sm text-slate-300">{row.dept}</td>
                <td className="px-3 py-4 text-sm text-slate-300">{row.date}</td>
                <td className="px-3 py-4 text-sm text-slate-300">{row.ward}</td>
                <td className="rounded-r-2xl px-3 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(row.status)}`}>
                    {row.status}
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

export default ActivityTableCard;