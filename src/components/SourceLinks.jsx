import { ExternalLink } from "lucide-react";

const defaultSources = [
  {
    label: "HKEX 新上市证券",
    href: "https://www.hkex.com.hk/Services/Trading/Securities/Trading-News/Newly-Listed-Securities?sc_lang=zh-HK"
  },
  {
    label: "HKEX AP / PHIP",
    href: "https://www1.hkexnews.hk/app/appindex.html?lang=zh"
  },
  {
    label: "证监会境外发行上市备案",
    href: "https://www.csrc.gov.cn/csrc/c100098/common_list.shtml"
  },
  {
    label: "SEC EDGAR",
    href: "https://www.sec.gov/search-filings"
  },
  {
    label: "Nasdaq IPO",
    href: "https://www.nasdaq.com/market-activity/ipos"
  },
  {
    label: "NYSE Listings",
    href: "https://www.nyse.com/listings_directory/stock"
  }
];

export default function SourceLinks({ sources = defaultSources, title = "官方信息源" }) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-slate-900">{title}</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {source.label}
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}