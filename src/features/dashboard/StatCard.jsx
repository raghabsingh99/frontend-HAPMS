import Card from "../../component/ui/Card";

function StatCard({ title, value, subtitle, accentClass = "bg-blue-500/20 text-blue-300" }) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
        {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
      </div>

      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass}`}>
        <div className="h-3 w-3 rounded-full bg-current" />
      </div>
    </Card>
  );
}

export default StatCard;