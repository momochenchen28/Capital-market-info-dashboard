import { TrendingUp } from "lucide-react";

function formatMoney(value, currency = "HKD") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "待补充";
  if (value >= 1000000000) return `${currency} ${(value / 1000000000).toFixed(3)}bn`;
  if (value >= 100000000) return `${currency} ${(value / 100000000).toFixed(2)}亿`;
  return `${currency} ${Number(value).toLocaleString()}`;
}

function IpoSummary({ item }) {
  if (!item.ipo) return null;
  const currency = item.ipo.currency || "HKD";

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
        <TrendingUp className="mb-2 h-4 w-4" />
        发行概况：{(item.ipo.sharesOffered / 1000000).toFixed(4)}m 股；发行价 {currency}$
        {item.ipo.offerPrice}；募资总额约 {formatMoney(item.ipo.grossProceeds, currency)}；上市市值约{" "}
        {formatMoney(item.ipo.marketCapAtListing, currency)}
      </div>
      <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
        <TrendingUp className="mb-2 h-4 w-4" />
        认购分配：公开发售超购 {item.ipo.publicOfferOversubscription}x；国际发售超购{" "}
        {item.ipo.internationalOfferOversubscription}x；{item.ipo.clawback}
      </div>
      <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
        <TrendingUp className="mb-2 h-4 w-4" />
        基石投资者：{item.ipo.cornerstone?.join("、") || "待补充"}；合计获配{" "}
        {item.ipo.cornerstoneTotalShares
          ? `${(item.ipo.cornerstoneTotalShares / 1000000).toFixed(4)}m 股`
          : "待补充"}
        ，占发售股份约 {item.ipo.cornerstonePctOfOffer ?? "待补充"}%
      </div>
    </div>
  );
}

function MarketPerformance({ item }) {
  if (!item.marketPerformance) return null;
  const market = item.marketPerformance;

  return (
    <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="mb-3 text-sm font-medium text-slate-900">首日及最新市场表现</p>
      <div className="grid gap-2 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
          发行价：HK${market.offerPrice}
        </div>
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
          首日开盘：
          {market.openPrice ? `HK$${market.openPrice}，较发行价 ${market.openChangePctVsOffer}%` : "待补充"}
        </div>
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
          首日收盘：
          {market.firstDayClose
            ? `HK$${market.firstDayClose}，较发行价 ${market.firstDayCloseChangePctVsOffer}%`
            : "待补充"}
        </div>
        <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
          最新：{market.latestPrice ? `HK$${market.latestPrice}，${market.latestChangePct}%` : market.latestPriceNote}
        </div>
      </div>
    </div>
  );
}

function TimelineAndIntermediaries({ item }) {
  if (!item.timeline && !item.intermediaries) return null;

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {item.timeline && (
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-slate-900">上市申请 / 备案时间线</p>
          <ul className="space-y-2 text-sm text-slate-600">
            {Object.entries({
              首次递交上市申请: item.timeline.firstFilingDate,
              最近一次提交上市申请: item.timeline.refilingDate,
              证监会公示收到备案: item.timeline.csrcReceivedDate,
              通过备案: item.timeline.csrcFilingApprovedDate,
              最近一次通过聆讯: item.timeline.hearingDate,
              招股书日期: item.timeline.prospectusDate,
              配发结果日期: item.timeline.allotmentResultDate,
              上市日期: item.timeline.listingDate
            }).map(([label, value]) =>
              value ? <li key={label}>- {label}：{value}</li> : null
            )}
          </ul>
        </div>
      )}
      {item.intermediaries && (
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-slate-900">主要中介机构</p>
          <ul className="space-y-2 text-sm text-slate-600">
            {Object.entries({
              保荐人: item.intermediaries.sponsors,
              整体协调人: item.intermediaries.overallCoordinators,
              全球协调人: item.intermediaries.globalCoordinators,
              账簿管理人: item.intermediaries.bookrunners,
              牵头经办人: item.intermediaries.leadManagers,
              "公司香港及美国法律顾问": item.intermediaries.companyLegalAdvisersHKUS,
              公司中国法律顾问: item.intermediaries.companyLegalAdvisersPRC,
              "承销商法律顾问": item.intermediaries.underwritersLegalAdvisers,
              "申报会计师/审计师": item.intermediaries.accountants || item.intermediaries.auditors,
              行业顾问: item.intermediaries.industryConsultant,
              合规顾问: item.intermediaries.complianceAdvisor
            }).map(([label, values]) =>
              values?.length ? <li key={label}>- {label}：{values.join("、")}</li> : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function IpoDetails({ item }) {
  return (
    <>
      <IpoSummary item={item} />
      <MarketPerformance item={item} />
      <TimelineAndIntermediaries item={item} />
    </>
  );
}
