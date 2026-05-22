import { Landmark, RefreshCw } from "lucide-react";

const reportTypeLabel = {
  briefing: "资本市场快报",
  daily: "资本市场日报",
  archive: "资本市场日报档案"
};

export default function Header({
  activeReport,
  reportDates,
  selectedDate,
  onSelectDate,
  onRefreshData,
  isRefreshing
}) {
  const title = reportTypeLabel[activeReport.reportType] || activeReport.title;

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Landmark className="mr-2 h-3.5 w-3.5" />
            Capital Markets Daily Dashboard
          </div>
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">{title}</h1>

          <div className="mt-3 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            <p>
              {activeReport.statusNote ||
                "覆盖港股新挂牌、港交所 AP / PHIP、证监会备案、美股中概 IPO。当前版本为静态日报原型。"}
            </p>
            {activeReport.archiveNotice && (
              <p className="mt-2 font-medium text-amber-700">{activeReport.archiveNotice}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={selectedDate}
            onChange={(event) => onSelectDate(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
          >
            {reportDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            刷新数据
          </button>
        </div>
      </div>
    </header>
  );
}