import Card from "../../component/ui/Card";

function StatCard({
  title,
  value,
  subtitle,
  accentClass = "bg-[#e8f3df] text-[#17351f]",
}) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <p className="text-sm font-medium text-[#6b7280]">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-[#1f2933]">{value}</h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-[#8a8f98]">{subtitle}</p>
        ) : null}
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass}`}
      >
        <div className="h-3 w-3 rounded-full bg-current" />
      </div>
    </Card>
  );
}

export default StatCard;