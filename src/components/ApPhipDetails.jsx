import { ExternalLink, FileText } from "lucide-react";
import { countApPhip } from "../dashboardData.js";

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-xl border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function ApplicationGroup({ title, dot, apps, linkMap }) {
  if (apps.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${dot}`} />
        <p className="text-sm font-semibold text-slate-900">{title}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {apps.map((app) => (
          <div
            key={`${app.nameEn}-${app.filingDate}-${app.status}`}
            className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={
                  app.status === "PHIP"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }
              >
                {app.status}
              </Badge>
              <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs text-slate-600">
                {app.documentType}
              </span>
            </div>
            <p className="mt-3 font-medium text-slate-900">{app.nameZh}</p>
            <p className="mt-1 text-xs text-slate-500">{app.nameEn}</p>
            <div className="mt-3 grid gap-2 text-xs text-slate-600 md:grid-cols-2">
              <span>披露日期：{app.filingDate}</span>
              <span>上市架构：{app.structure}</span>
              <span>行业/业务：{app.sector}</span>
              <span>保荐人：{app.sponsors}</span>
              <span className="md:col-span-2">业务简介：{app.businessSummary}</span>
            </div>
            <div className="mt-3">
              <a
                href={linkMap[app.prospectusLink] || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <FileText className="mr-2 h-3.5 w-3.5" />
                {app.status === "PHIP" ? "PHIP / 聆讯后资料集" : "招股书 / AP 文件"}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ApPhipDetails({ item, emptyEventText, linkMap }) {
  const applications = item.apApplications || [];
  const newAp = applications.filter(
    (app) => app.status === "NEW AP" || app.documentType?.includes("Application Proof")
  );
  const phip = applications.filter((app) => app.status === "PHIP" || app.documentType?.includes("PHIP"));
  const actual = countApPhip(applications);

  return (
    <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-slate-900">AP / PHIP 公司明细</p>
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
          NEW AP：{item.metrics?.apNewCount ?? actual.apNewCount}
        </Badge>
        <Badge className="border-blue-200 bg-blue-50 text-blue-700">
          PHIP：{item.metrics?.phipCount ?? actual.phipCount}
        </Badge>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          {emptyEventText}
        </div>
      ) : (
        <div className="space-y-5">
          <ApplicationGroup title="新递交上市申请 / NEW AP" dot="bg-emerald-500" apps={newAp} linkMap={linkMap} />
          <ApplicationGroup title="过聆讯 / PHIP" dot="bg-blue-500" apps={phip} linkMap={linkMap} />
        </div>
      )}
    </div>
  );
}