export default function CsrcDetails({ item }) {
  if (!item.csrc && !item.csrcSupplement) return null;

  return (
    <>
      {item.csrc && (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-3 text-sm font-medium text-slate-900">备案通知书要点</p>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              文号：{item.csrc.noticeNo || "待补充"}
            </div>
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              拟上市地：{item.csrc.targetMarket || "待补充"}
            </div>
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              发行上限：{item.csrc.maxIssuance || "待补充"}
            </div>
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              境内运营实体：{item.csrc.domesticOperatingEntity || "待补充"}
            </div>
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              通知书日期：{item.csrc.noticeDate || "待补充"}
            </div>
            <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">
              官网披露日期：{item.csrc.publishDate || "待补充"}
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {(item.csrc.postFilingObligations || []).map((text) => (
              <li key={text}>- {text}</li>
            ))}
          </ul>
        </div>
      )}

      {item.csrcSupplement && (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-3 text-sm font-medium text-slate-900">补充材料要求明细</p>
          <p className="mb-4 text-sm text-slate-600">
            公示期间：{item.csrcSupplement.period}；披露日期：{item.csrcSupplement.publishDate}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {(item.csrcSupplement.companies || []).map((company) => (
              <div key={company.name} className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                <p className="font-medium text-slate-900">{company.name}</p>
                <p className="mt-1 text-xs text-slate-500">拟上市市场：{company.likelyMarket}</p>
                <ul className="mt-3 space-y-1">
                  {(company.coreIssues || []).map((issue) => (
                    <li key={issue}>- {issue}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}