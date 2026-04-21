import Card from "../../component/ui/Card";

function ReportChartCard() {
  const bars = [35, 62, 44, 76, 58, 82, 66, 90];

  return (
    <Card className="h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Medical Report</h3>
          <p className="mt-1 text-sm text-slate-400">Survey overview and trends</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>2023</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
            <span>2022</span>
          </div>
        </div>
      </div>

      <div className="flex h-[260px] items-end gap-3 rounded-2xl border border-white/6 bg-white/4 p-4">
        {bars.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div
              className="w-full rounded-t-2xl bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400 opacity-90"
              style={{ height: `${height}%` }}
            />
            <span className="text-[10px] text-slate-500">{2016 + index}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ReportChartCard;