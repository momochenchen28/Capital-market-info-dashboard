import { ExternalLink, FileText, TrendingUp } from "lucide-react";
import { isNoNewEvent, sectionTheme, typeBadgeClass } from "../utils/dashboard.js";
import ApPhipDetails from "./ApPhipDetails.jsx";
import CsrcDetails from "./CsrcDetails.jsx";
import IpoDetails from "./IpoDetails.jsx";

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-xl border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return <article className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</article>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function DetailBlocks({ item }) {
  const detailItems = item.ipo ? null : item.csrcKeyIssues || item.monitorItems || [];
  if (!detailItems?.length) return null;

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {detailItems.map((detail) => (
        <div key={detail} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
          <TrendingUp className="mb-2 h-4 w-4" />
          {detail}
        </div>
      ))}
    </div>
  );
}

export default function DealCard({ item, emptyEventText, linkMap }) {
  const theme = sectionTheme[item.section];

  return (
    <Card className={`overflow-hidden border ${theme?.card || "border-slate-100"}`}>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={theme?.soft || "border-slate-200 bg-slate-100 text-slate-700"}>
                {item.section}
              </Badge>
              <Badge className={typeBadgeClass[item.type] || "border-slate-200 bg-slate-50 text-slate-700"}>
                {item.type}
              </Badge>
              <span className="text-sm text-slate-500">
                {[item.company?.exchange, item.company?.board, item.company?.listingStructure]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{item.company?.display}</h2>
              {item.reportDate && (
                <span className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-500">
                  来源日期：{item.reportDate}
                </span>
              )}
            </div>
            {(item.company?.zh || item.company?.en || item.company?.ticker) && (
              <div className="mt-2 grid gap-1 text-sm text-slate-500 md:grid-cols-3">
                {item.company?.zh && <span>中文名：{item.company.zh}</span>}
                {item.company?.en && <span>英文名：{item.company.en}</span>}
                {item.company?.ticker && <span>代码：{item.company.ticker}</span>}
              </div>
            )}
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{item.business?.summary}</p>
          </div>
          <Badge
            className={
              isNoNewEvent(item, emptyEventText)
                ? "border-slate-200 bg-slate-50 text-slate-600"
                : "border-slate-900 bg-slate-900 text-white"
            }
          >
            {item.status}
          </Badge>
        </div>

        <IpoDetails item={item} />
        <DetailBlocks item={item} />
        {item.metrics && <ApPhipDetails item={item} emptyEventText={emptyEventText} linkMap={linkMap} />}
        <CsrcDetails item={item} />

        <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-slate-900">官方/行情文件链接</p>
          <div className="flex flex-wrap gap-2">
            {(item.links || []).map((link) => (
              <a
                key={link}
                href={linkMap[link] || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <FileText className="mr-2 h-4 w-4" />
                {link}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}