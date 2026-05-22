import { Landmark } from "lucide-react";

export default function Header({ activeReport, reportDates, selectedDate, onSelectDate }) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Landmark className="mr-2 h-3.5 w-3.5" />
            Capital Markets Daily Dashboard
          </div>
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">{activeReport.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            覆盖港股新挂牌、港交所 AP / PHIP、证监会备案、美股中概 IPO。当前版本为静态日报原型，暂不接自动抓取。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {reportDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => onSelectDate(date)}
              className={`rounded-xl border px-3 py-2 text-sm ${
                selectedDate === date
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}