import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ExternalLink, FileText, Landmark, Search, TrendingUp } from "lucide-react";

const linkMap = {
  "HKEX Newly Listed Securities": "https://www.hkex.com.hk/Services/Trading/Securities/Trading-News/Newly-Listed-Securities?sc_lang=zh-HK",
  "HKEX New Listing Information": "https://www2.hkexnews.hk/new-listings/new-listing-information/main-board?sc_lang=en",
  "UISEE 招股书": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0512/12155620/2026051200160.pdf",
  "UISEE 配发结果": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0519/2026051901257.pdf",
  "UISEE 聆讯后资料集": "https://www1.hkexnews.hk/app/sehk/2025/107903/a132099/sehk26041900132.pdf",
  "TOPNC 招股书入口": "https://www2.hkexnews.hk/new-listings/new-listing-information/main-board?sc_lang=en",
  "TOPNC 配发结果": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0519/2026051901261.pdf",
  "TOPNC 聆讯后资料集": "https://www1.hkexnews.hk/app/sehk/2025/107893/documents/sehk26050602726_c.pdf",
  "Application Proof / PHIP": "https://www1.hkexnews.hk/app/appindex.html?lang=zh",
  "CSRC 境外发行上市备案": "https://www.csrc.gov.cn/csrc/c100098/common_list.shtml",
  "CSRC 大搜车备案通知书": "https://www.csrc.gov.cn/csrc/c105984/c7628436/content.shtml",
  "CSRC 4/20-4/24补充材料要求": "https://www.csrc.gov.cn/csrc/c105983/c7628529/content.shtml",
  "SEC EDGAR Latest Filings": "https://www.sec.gov/search-filings",
  "TENNOR 招股书": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0514/2026051400013.pdf",
  "TENNOR 全球发售公告": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0514/2026051400003.pdf",
  "TENNOR PHIP": "https://www1.hkexnews.hk/app/sehk/2026/108182/a132655/sehk26050602769.pdf",
  "TENNOR 行情/IPO资料": "https://www.etnet.com.hk/www/eng/stocks/ci_ipo_detail.php?code=6872"
};

const dailyReports = {
  "2026-04-24": {
    date: "2026-04-24",
    title: "中国证监会境外上市备案测试",
    observations: [
      "4/24 证监会披露 4 单境外发行上市备案通知书，涉及赴美上市、H股上市及“全流通”项目；",
      "同日发布 4/20—4/24 区间补充材料要求公示，涉及 6 家企业；",
      "反馈问题集中在历史股权变动、红筹/VIE架构、返程投资合规、外资准入、全流通股份权利瑕疵及募资/发行方案一致性。"
    ],
    deals: [

  {
    id: "csrc-binhua-20260424",
    section: "证监会备案",
    type: "备案通知书 / 备案完成",
    status: "已备案",
    company: {
      zh: "滨化集团股份有限公司",
      en: "Binhua Group Co., Ltd.",
      display: "滨化集团股份有限公司",
      ticker: "A股上市公司",
      exchange: "CSRC / HKEX",
      board: "境外发行上市备案",
      listingStructure: "A+H（高置信度推断）"
    },
    business: {
      summary: "A股上市化工企业，主要从事氯碱化工及新能源化学材料业务；本次为境外发行上市备案项目，预计为A+H架构赴港上市。",
      sector: "化工 / 新能源材料 / A+H"
    },
    csrc: {
      filingType: "境外发行上市备案通知书",
      noticeNo: "国合函〔2026〕886号",
      publishDate: "2026-04-24",
      targetMarket: "香港联交所（推断）"
    },
    csrcKeyIssues: [
      "A股上市公司赴港",
      "预计为 A+H 架构",
      "备案通知书编号：国合函〔2026〕886号"
    ],
    links: ["CSRC 境外发行上市备案"]
  },
  {
    id: "csrc-tianchen-20260424",
    section: "证监会备案",
    type: "备案通知书 / 全流通",
    status: "已备案",
    company: {
      zh: "天辰生物医药（苏州）股份有限公司",
      en: "Tianchen Biopharmaceutical (Suzhou) Co., Ltd.",
      display: "天辰生物医药（苏州）股份有限公司",
      ticker: "拟H股上市",
      exchange: "CSRC / HKEX",
      board: "境外发行上市及全流通备案",
      listingStructure: "H股 + 全流通（高置信度）"
    },
    business: {
      summary: "生物医药企业，本次获得境外发行上市及境内未上市股份“全流通”备案通知书。",
      sector: "生物医药 / H股"
    },
    csrc: {
      filingType: "境外发行上市及全流通备案通知书",
      noticeNo: "国合函〔2026〕871号",
      publishDate: "2026-04-24",
      targetMarket: "香港联交所（高置信度推断）"
    },
    csrcKeyIssues: [
      "涉及境内未上市股份“全流通”",
      "典型 H股 架构",
      "备案通知书编号：国合函〔2026〕871号"
    ],
    links: ["CSRC 境外发行上市备案"]
  },
  {
    id: "csrc-xinhehua-20260424",
    section: "证监会备案",
    type: "备案通知书 / 全流通",
    status: "已备案",
    company: {
      zh: "四川新荷花中药饮片股份有限公司",
      en: "Sichuan Xinhehua Chinese Herbal Pieces Co., Ltd.",
      display: "四川新荷花中药饮片股份有限公司",
      ticker: "拟H股上市",
      exchange: "CSRC / HKEX",
      board: "境外发行上市及全流通备案",
      listingStructure: "H股 + 全流通（高置信度）"
    },
    business: {
      summary: "中药饮片企业，本次获得境外发行上市及境内未上市股份“全流通”备案通知书。",
      sector: "中药饮片 / H股"
    },
    csrc: {
      filingType: "境外发行上市及全流通备案通知书",
      noticeNo: "国合函〔2026〕863号",
      publishDate: "2026-04-24",
      targetMarket: "香港联交所（高置信度推断）"
    },
    csrcKeyIssues: [
      "涉及境内未上市股份“全流通”",
      "典型 H股 架构",
      "备案通知书编号：国合函〔2026〕863号"
    ],
    links: ["CSRC 境外发行上市备案"]
  },
  {
    id: "csrc-dsc-20260424",
    section: "证监会备案",
    type: "备案通知书 / 备案完成",
    status: "已备案",
    company: {
      zh: "大搜车控股有限公司",
      en: "DSC Holdings Ltd.",
      display: "DSC Holdings Ltd.（大搜车控股有限公司）",
      ticker: "拟赴美上市",
      exchange: "CSRC / Nasdaq",
      board: "境外发行上市备案",
      listingStructure: "VIE（待SEC公开F-1核验）"
    },
    business: {
      summary: "公司通过境内运营实体浙江大搜车软件技术有限公司提交境外发行上市备案材料；拟在美国纳斯达克证券交易所上市。架构按VIE标注，但因SEC公开F-1暂未稳定检索到，正式版需在F-1公开后以招股书“Corporate History and Structure / Contractual Arrangements”章节复核。",
      sector: "汽车流通产业互联网 / 赴美 IPO"
    },
    csrc: {
      filingType: "境外发行上市备案通知书",
      noticeNo: "国合函〔2026〕888号",
      publishDate: "2026-04-24",
      noticeDate: "2026-04-21",
      applicant: "DSC Holdings Ltd.（大搜车控股有限公司）",
      domesticOperatingEntity: "浙江大搜车软件技术有限公司",
      targetMarket: "美国纳斯达克证券交易所",
      structure: {
        type: "VIE",
        confidence: "medium",
        source: "用户核对 + 待SEC公开F-1复核；证监会备案通知书仅披露境内运营实体，不足以单独判断架构"
      },
      proposedSecurities: "普通股",
      maxIssuance: "不超过 190,848,475 股普通股",
      postFilingObligations: [
        "备案通知书出具之日起至本次境外发行上市结束前，如发生重大事项，应通过中国证监会备案管理信息系统报告",
        "完成境外发行上市后 15 个工作日内，应通过中国证监会备案管理信息系统报告发行上市情况",
        "自备案通知书出具之日起 12 个月内未完成境外发行上市、拟继续推进的，应更新备案材料"
      ]
    },
    csrcKeyIssues: [
      "赴美上市备案：拟登陆 Nasdaq",
      "发行上限：不超过 190,848,475 股普通股",
      "架构判断：VIE（待SEC公开F-1核验）",
      "境内运营实体：浙江大搜车软件技术有限公司"
    ],
    timeline: {
      csrcApprovalDate: "2026-04-21",
      csrcPublishDate: "2026-04-24",
      listingDate: "待上市"
    },
    links: ["CSRC 大搜车备案通知书"]
  },
  {
    id: "csrc-supplement-20260420-20260424",
    section: "证监会备案",
    type: "补充材料要求公示",
    status: "需补充材料",
    company: {
      zh: "境外发行上市备案补充材料要求公示（2026年4月20日—2026年4月24日）",
      en: "CSRC Supplementary Filing Requirements",
      display: "2026年4月20日—4月24日补充材料要求公示",
      exchange: "CSRC",
      board: "许可反馈意见公开",
      listingStructure: "多家公司"
    },
    business: {
      summary: "证监会于 2026-04-24 发布该区间境外发行上市备案补充材料要求公示；本轮涉及 6 家企业，问题集中在历史股权变动、股权架构搭建、外资准入、全流通股份权利瑕疵、募资规模/发行方案一致性等。",
      sector: "境外上市备案反馈"
    },
    csrcSupplement: {
      publishDate: "2026-04-24",
      period: "2026-04-20 至 2026-04-24",
      companies: [
        {
          name: "维达力",
          likelyMarket: "香港",
          coreIssues: ["BCPE Baymax 与阳光人寿股份转让交割", "历史股份代持及历次股权变动合规性", "5%以上股东穿透核查", "社保/公积金缴纳及处罚整改", "超额配售后募集资金量及全流通股份权利瑕疵"]
        },
        {
          name: "征祥医药",
          likelyMarket: "香港",
          coreIssues: ["设立及历次股权变动合规性", "员工持股计划是否存在利益输送", "备案材料与招股书发行方案不一致原因", "股份拆分安排及超额配股权后预计募资", "全流通股份权利瑕疵"]
        },
        {
          name: "爷爷的农场",
          likelyMarket: "香港",
          coreIssues: ["股权控制架构设立及返程投资合规性", "历史股权代持", "外资准入负面清单适配", "是否属于高耗能/高排放行业或项目"]
        },
        {
          name: "英可斯",
          likelyMarket: "境外",
          coreIssues: ["37号文外汇登记及境内机构 ODI 程序", "红筹架构返程并购定价、税费及并购规定合规性", "注册地变更原因", "主营业务资源及资质"]
        },
        {
          name: "誉研堂",
          likelyMarket: "境外",
          coreIssues: ["历次增资/转让定价及利益输送", "互联网药品信息服务资质与外资准入", "全流通股份权利瑕疵"]
        },
        {
          name: "邦顺制药",
          likelyMarket: "境外",
          coreIssues: ["历次增资/股权转让价格及出资瑕疵", "国有股东标识及国资程序", "近12个月新增股东入股价格合理性", "人类遗传资源管理相关程序", "全流通股份权利瑕疵"]
        }
      ]
    },
    csrcKeyIssues: [
      "本轮反馈公司数：6 家",
      "高频问题：股权变动/代持/利益输送/全流通权利瑕疵",
      "监管关注：红筹/VIE架构、返程并购、外资准入、37号文、国资程序、人类遗传资源"
    ],
    links: ["CSRC 4/20-4/24补充材料要求", "CSRC 境外发行上市备案"]
  }
    ]
  },
  "2026-05-20": {
    date: "2026-05-20",
    title: "港股 IPO 新挂牌样报",
    observations: [
      "当日港股 IPO 新挂牌 2 家：馭勢科技（01511.HK）与拓璞數控（07688.HK）；同日港交所新递交上市申请 6 家；",
      "两家公司公开发售认购倍数均处极高水平，分别约 6,777x 与 3,765x；",
      "首日表现分化明显，资金对高端装备制造主题的交易热度明显高于自动驾驶商业化主题；当日未见过聆讯项目。"
    ],
    deals: [
      {
        id: "hkex-01511-20260520",
        section: "港股新挂牌",
        type: "今日新上市",
        status: "已上市",
        company: {
          zh: "馭勢科技（北京）股份有限公司",
          en: "UISEE Technologies (Beijing) Co., Ltd.",
          display: "馭勢科技（北京）股份有限公司 / UISEE Technologies (Beijing) Co., Ltd.（01511.HK）",
          ticker: "01511.HK",
          exchange: "HKEX",
          board: "主板",
          listingStructure: "H股"
        },
        business: {
          summary: "大中华区专注于无人化 L4 级技术的自动驾驶解决方案供应商，重点场景包括机场、厂区等封闭/半封闭场景。",
          sector: "自动驾驶 / 智能驾驶解决方案"
        },
        ipo: {
          listingDate: "2026-05-20",
          offerPrice: 60.3,
          currency: "HKD",
          sharesOffered: 14461200,
          grossProceeds: 872000000,
          postListingShares: 162485000,
          marketCapAtListing: 9798000000,
          publicOfferApplications: 285972,
          publicOfferOversubscription: 6777.29,
          internationalOfferOversubscription: 5.66,
          clawback: "触发回拨；香港公开发售最终占全球发售 20%",
          cornerstone: [
            { name: "Xiongan Autonomous Driving", allocationShares: null },
            { name: "CYGG", allocationShares: null },
            { name: "Starwin International", allocationShares: null }
          ],
          cornerstoneTotalShares: 4332200,
          cornerstonePctOfOffer: 29.96
        },
        marketPerformance: {
          offerPrice: 60.3,
          openPrice: 56.0,
          openChangePctVsOffer: -7.13,
          firstDayClose: 57.5,
          firstDayCloseChangePctVsOffer: -4.64,
          latestPrice: 59.0,
          latestChangePct: 2.61,
          latestPriceNote: "延迟行情样例；收盘后字段改为今日涨跌幅"
        },
        timeline: {
          firstFilingDate: "2025-05-28",
          refilingDate: "2025-11-28",
          refilingNote: "前次申请失效后再次提交",
          csrcAcceptanceDate: "待从证监会官网核验",
          csrcApprovalDate: "待从证监会官网核验",
          hearingDate: "2026-04-19",
          prospectusDate: "2026-05-12",
          allotmentResultDate: "2026-05-19",
          listingDate: "2026-05-20"
        },
        intermediaries: {
          sponsors: ["中信证券（香港）有限公司 / CITIC Securities (Hong Kong) Limited"],
          sponsorOverallCoordinators: ["CLSA Limited"],
          overallCoordinators: ["CLSA Limited"],
          globalCoordinators: ["CLSA Limited", "交银国际", "DBS Asia Capital", "中国银河国际", "Hong Tai Securities"],
          bookrunners: ["CLSA Limited", "交银国际", "DBS Asia Capital", "中国银河国际", "Hong Tai Securities"],
          leadManagers: ["CLSA Limited", "交银国际", "DBS Asia Capital", "中国银河国际", "Hong Tai Securities"],
          auditors: ["安永"],
          issuerCounsel: ["盛德律师事务所（香港及美国法）", "金杜（中国法及国际制裁法）"],
          underwriterCounsel: ["Herbert Smith Freehills Kramer", "君合"],
          industryConsultant: ["弗若斯特沙利文"]
        },
        links: ["UISEE 招股书", "UISEE 配发结果", "UISEE 聆讯后资料集", "HKEX New Listing Information"]
      },
      {
        id: "hkex-07688-20260520",
        section: "港股新挂牌",
        type: "今日新上市",
        status: "已上市",
        company: {
          zh: "上海拓璞數控科技股份有限公司",
          en: "Shanghai Top Numerical Control Technology Co., Ltd.",
          display: "上海拓璞數控科技股份有限公司 / Shanghai Top Numerical Control Technology Co., Ltd.（07688.HK）",
          ticker: "07688.HK",
          exchange: "HKEX",
          board: "主板",
          listingStructure: "H股"
        },
        business: {
          summary: "中国高端智能制造装备企业，主要从事五轴数控机床研发、设计、生产及销售，聚焦航空航天智能制造装备。",
          sector: "高端装备 / 五轴数控机床"
        },
        ipo: {
          listingDate: "2026-05-20",
          offerPrice: 26.39,
          currency: "HKD",
          sharesOffered: 65330000,
          grossProceeds: 1724000000,
          postListingShares: 409282000,
          marketCapAtListing: 9803000000,
          publicOfferApplications: 344049,
          publicOfferOversubscription: 3764.63,
          internationalOfferOversubscription: 30.46,
          clawback: "未回拨；香港公开发售维持 10%；有 9.7995m 股超额分配",
          cornerstone: [
            { name: "RBC", allocationShares: null },
            { name: "3W", allocationShares: null },
            { name: "Boyu", allocationShares: null },
            { name: "HHLR", allocationShares: null },
            { name: "UBS AM Singapore", allocationShares: null },
            { name: "CDH", allocationShares: null },
            { name: "华夏基金", allocationShares: null },
            { name: "GSAM", allocationShares: null }
          ],
          cornerstoneTotalShares: 32665000,
          cornerstonePctOfOffer: 50.0
        },
        marketPerformance: {
          offerPrice: 26.39,
          openPrice: 37.0,
          openChangePctVsOffer: 40.2,
          firstDayClose: 47.5,
          firstDayCloseChangePctVsOffer: 80.0,
          latestPrice: null,
          latestChangePct: null,
          latestPriceNote: "正式运行时接入延迟或实时行情；收盘后自动改为当日收盘涨跌幅"
        },
        timeline: {
          firstFilingDate: "2025-05-26",
          refilingDate: "2025-11-26",
          refilingNote: "前次申请失效后再次提交",
          csrcAcceptanceDate: "待从证监会官网核验",
          csrcApprovalDate: "待从证监会官网核验",
          hearingDate: "2026-05-06",
          hearingNote: "晚间披露 PHIP",
          prospectusDate: "2026-05-12",
          allotmentResultDate: "2026-05-19",
          listingDate: "2026-05-20"
        },
        intermediaries: {
          sponsors: ["国泰君安国际", "建银国际"],
          overallCoordinators: ["待从招股书中介章节核验"],
          globalCoordinators: ["待从招股书中介章节核验"],
          bookrunners: ["待从招股书中介章节核验"],
          leadManagers: ["待从招股书中介章节核验"],
          auditors: ["安永"],
          issuerCounsel: ["竞天公诚（中国法）", "竞天公诚（香港法）"],
          underwriterCounsel: ["中伦（中国法）"],
          complianceAdvisor: ["国泰君安国际"],
          industryConsultant: ["灼识咨询"]
        },
        links: ["TOPNC 招股书入口", "TOPNC 配发结果", "TOPNC 聆讯后资料集", "HKEX New Listing Information"]
      }
      ,
      {
        id: "hkex-ap-20260520",
        section: "港股递表/聆讯",
        type: "新递交上市申请",
        status: "6 家递表 / 无过聆讯",
        company: {
          zh: "港交所新递交上市申请汇总",
          en: "HKEX New Application Proof Summary",
          display: "港交所新递交上市申请汇总（2026-05-20）",
          ticker: null,
          exchange: "HKEX",
          board: "Application Proof",
          listingStructure: "多家公司"
        },
        business: {
          summary: "2026-05-20 港交所 AP 页面有 6 家公司提交上市申请；该模块汇总当日港交所首次递交 Application Proof 公司，并展示公司中英文名、行业方向及核心递表信息。",
          sector: "港股 IPO pipeline"
        },
        metrics: { apNewCount: 6, phipCount: 0 },
        monitorItems: [
          "新递交上市申请：6 家（按 5/20 首次递交 Application Proof 口径）",
          "过聆讯/PHIP：2 家",
          "Kexing Biopharm 为 5/6 首次递交、5/20 修订 OC/更新，不计入 5/20 新递表"
        ],
        apApplications: [
          { nameEn: "CTG Hongkong and Macao Culture and Tourism Holding Limited", nameZh: "中旅港澳文化旅游控股有限公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "文旅 / 旅游运营", structure: "H股", sponsors: "中金公司", businessSummary: "中国旅游集团旗下港澳文旅平台，覆盖景区、酒店及综合旅游服务。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Lingong Heavy Machinery Co., Ltd", nameZh: "临工重机股份有限公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "重型机械 / 装备制造", structure: "H股", sponsors: "中信证券、华泰国际", businessSummary: "矿山机械及高空作业平台制造商，聚焦新能源矿卡及智能矿山装备。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "LINGYI iTECH (GUANGDONG) COMPANY", nameZh: "领益智造（广东）公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "消费电子 / 精密制造", structure: "A+H", sponsors: "高盛、招银国际", businessSummary: "消费电子精密功能件与模组龙头企业，服务全球头部终端品牌。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Shanghai Guan An Information Technology Co., Ltd.", nameZh: "上海观安信息技术股份有限公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "网络安全 / 信息技术", structure: "红筹", sponsors: "中信建投国际", businessSummary: "企业级网络安全与数据安全解决方案提供商，聚焦金融及政企客户。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Shanghai KeLiang Information Technology Co., Ltd.", nameZh: "上海科梁信息科技股份有限公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "信息技术 / 软件服务", structure: "红筹", sponsors: "国泰君安国际", businessSummary: "工业数字化及企业软件服务商，提供智能制造 IT 系统解决方案。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Tage iDriver Technology Co., Ltd.", nameZh: "踏歌智行科技有限公司", filingDate: "2026-05-20", documentType: "Application Proof (1st submission)", status: "新递表", sector: "矿区无人驾驶 / 自动驾驶", structure: "VIE", sponsors: "中金公司", businessSummary: "矿区无人驾驶解决方案供应商，服务露天煤矿及智慧矿山场景。", prospectusLink: "Application Proof / PHIP" }
        ],
        links: ["Application Proof / PHIP"]
      }
    ]
  },
  "2026-05-22": {
    date: "2026-05-22",
    title: "港股 IPO 新挂牌初版日报",
    observations: [
      "今日港股 IPO 新挂牌 1 家：丹诺医药-B / TenNor Therapeutics (06872.HK)，为 18A 生物科技公司；",
      "公开发售认购极热，etnet 显示公开发售超购约 9,015.11 倍，一手中签率约 0.8%；",
      "首日早盘涨幅显著，延迟行情显示 09:59 报 HK$182.50，较发行价 HK$75.70 上涨约 141.08%；证监会备案栏目当前未见 5/21 或 5/22 新披露。"
    ],
    deals: [
      {
        id: "hkex-06872-20260522",
        section: "港股新挂牌",
        type: "今日新上市",
        status: "已上市",
        company: {
          zh: "丹诺医药（苏州）股份有限公司",
          en: "TenNor Therapeutics (Suzhou) Limited",
          display: "丹诺医药（苏州）股份有限公司 / TenNor Therapeutics (Suzhou) Limited（06872.HK）",
          ticker: "06872.HK",
          exchange: "HKEX",
          board: "主板 · 18A",
          listingStructure: "H股 / 生物科技-B"
        },
        business: {
          summary: "临近商业化阶段的生物科技公司，专注于发现、开发及商业化用于细菌感染及细菌代谢相关疾病的差异化创新疗法。核心产品包括用于幽门螺杆菌感染的利福特尼唑（TNP-2198）及用于植入体相关细菌感染的利福喹酮（TNP-2092注射剂）。",
          sector: "生物科技 / 抗感染创新药 / 18A"
        },
        ipo: {
          listingDate: "2026-05-22",
          offerPrice: 75.7,
          currency: "HKD",
          sharesOffered: 8280550,
          grossProceeds: 626800000,
          postListingShares: null,
          marketCapAtListing: 3920000000,
          publicOfferApplications: null,
          publicOfferOversubscription: 9015.11,
          internationalOfferOversubscription: "待补充",
          clawback: "香港公开发售极高倍数超购；正式回拨比例待晚间复核配发结果公告",
          cornerstone: [
            { name: "AMR Action Fund", allocationShares: null },
            { name: "华圆管理咨询（香港）有限公司", allocationShares: null },
            { name: "东方资产管理（香港）有限公司", allocationShares: null },
            { name: "骏升环球有限公司", allocationShares: null }
          ],
          cornerstoneTotalShares: 2368000,
          cornerstonePctOfOffer: 28.6
        },
        marketPerformance: {
          offerPrice: 75.7,
          openPrice: null,
          openChangePctVsOffer: null,
          firstDayClose: null,
          firstDayCloseChangePctVsOffer: null,
          latestPrice: 182.5,
          latestChangePct: 141.083,
          latestPriceNote: "etnet 15分钟延迟行情，09:59 更新；收盘后需改为首日收盘表现"
        },
        timeline: {
          firstFilingDate: "2025-07-30",
          refilingDate: "2026-02-03",
          refilingNote: "前次递表失效后再次递表",
          csrcAcceptanceDate: "待从证监会备案表核验",
          csrcApprovalDate: "待从证监会备案表核验",
          hearingDate: "2026-05-06",
          prospectusDate: "2026-05-14",
          allotmentResultDate: "2026-05-21",
          listingDate: "2026-05-22"
        },
        intermediaries: {
          sponsors: ["中信证券（香港）有限公司", "农银国际融资有限公司"],
          overallCoordinators: ["中信证券（香港）有限公司", "农银国际融资有限公司"],
          globalCoordinators: ["中信证券（香港）有限公司", "农银国际融资有限公司"],
          bookrunners: ["CLSA Limited", "ABCI Securities Company Limited", "华兴证券（香港）", "富途证券国际", "Tiger Brokers (HK) Global Limited"],
          leadManagers: ["CLSA Limited", "ABCI Securities Company Limited", "华兴证券（香港）", "富途证券国际", "Tiger Brokers (HK) Global Limited"],
          auditors: ["普华永道"],
          issuerCounsel: ["锦天城", "美迈斯"],
          underwriterCounsel: ["竞天公诚", "高伟绅"],
          complianceAdvisor: ["迈时资本"],
          industryConsultant: ["弗若斯特沙利文"]
        },
        links: ["TENNOR 招股书", "TENNOR 全球发售公告", "TENNOR PHIP", "TENNOR 行情/IPO资料", "HKEX New Listing Information"]
      },
      {
        id: "hkex-ap-phip-20260522",
        section: "港股递表/聆讯",
        type: "AP / PHIP 更新",
        status: "无新增",
        company: {
          zh: "港交所 AP & PHIP 页面日内更新监控",
          en: "HKEX AP & PHIP Monitor",
          display: "港交所 AP & PHIP 页面日内更新监控（2026-05-22 初版）",
          ticker: null,
          exchange: "HKEX",
          board: "Application Proof / PHIP",
          listingStructure: "多家公司"
        },
        business: {
          summary: "2026-05-22 当日初版未见新增 Application Proof 或 PHIP；建议晚间复核港交所 AP & PHIP 页面，确认是否有收市后/夜间更新。",
          sector: "港股 IPO pipeline"
        },
        metrics: { apNewCount: 0, phipCount: 0 },
        monitorItems: [
          "新递交上市申请：初版未见新增",
          "过聆讯/PHIP：初版未见新增",
          "晚间复核重点：是否有 AP、PHIP、OC 公告或招股书更新"
        ],
        links: ["Application Proof / PHIP"]
      },
      {
        id: "csrc-no-new-20260522",
        section: "证监会备案",
        type: "境外上市备案",
        status: "无新增",
        company: {
          zh: "今日未见新增境外上市备案公示",
          en: "No New CSRC Overseas Listing Filing",
          display: "今日未见新增境外上市备案公示",
          exchange: "CSRC",
          board: "境外发行上市备案",
          listingStructure: "不适用"
        },
        business: {
          summary: "证监会境外发行上市备案栏目当前可见最新披露仍为 2026-05-15 的备案情况表、补充材料要求及备案通知书；本次初版未见 2026-05-21 或 2026-05-22 新增披露。",
          sector: "境外上市备案监控"
        },
        monitorItems: [
          "备案通知书：初版未见新增",
          "补充材料要求：初版未见新增",
          "备案情况表：最新可见为截至 2026-05-15"
        ],
        links: ["CSRC 境外发行上市备案"]
      },
      {
        id: "us-china-ipo-no-new-20260522",
        section: "美股中概",
        type: "SEC 公开递交/上市",
        status: "无新增",
        company: {
          zh: "今日未见重点美股中概 IPO 新事件",
          en: "No material US-listed Chinese IPO event found in initial scan",
          display: "今日未见重点美股中概 IPO 新事件",
          exchange: "SEC / NYSE / Nasdaq",
          board: "F-1 / EFFECT / 8-A / Listing",
          listingStructure: "待事件触发"
        },
        business: {
          summary: "2026-05-22 当日初版未见需要纳入日报的重点中概 F-1、定价或挂牌事件；晚间可继续按美国东部时间窗口复核 SEC EDGAR。",
          sector: "美股中概 IPO 监控"
        },
        monitorItems: [
          "F-1 / F-1/A：初版未见重点新增",
          "EFFECT / 8-A：初版未见重点新增",
          "挂牌上市：初版未见重点新增"
        ],
        links: ["SEC EDGAR Latest Filings"]
      }
    ]
  },
  "2026-05-21": {
    date: "2026-05-21",
    title: "港股 IPO / 备案 / 美股中概空窗日样报",
    observations: [
      "当日港股无 IPO 新挂牌，港交所新上市证券清单显示主要为 HP LIVING RTS 未缴股款供股权交易；",
      "复核港交所 AP / PHIP 页面后，2026-05-21 实际新增 3 家上市申请及 2 家过聆讯项目；",
      "5/21 回查未见证监会新增披露；港股 IPO pipeline 活跃度高于初版抓取结果，需以后续 nightly refresh 为准。"
    ],
    deals: [
      {
        id: "hkex-no-ipo-20260521",
        section: "港股新挂牌",
        type: "今日新上市",
        status: "无新增",
        company: {
          zh: "今日无 IPO 新挂牌公司",
          en: "No IPO New Listing",
          display: "今日无 IPO 新挂牌公司",
          ticker: null,
          exchange: "HKEX",
          board: "主板 / GEM",
          listingStructure: "不适用"
        },
        business: {
          summary: "2026-05-21 港交所新上市证券清单未见 IPO 新挂牌；当日可见 HP LIVING RTS（02952）为未缴股款供股权交易，不属于 IPO 新上市。",
          sector: "新上市证券监控"
        },
        monitorItems: [
          "IPO 新挂牌：0 家",
          "非 IPO 新交易证券：HP LIVING RTS（02952）",
          "次日预计关注：TENNOR THERAP-B（06872）"
        ],
        links: ["HKEX Newly Listed Securities"]
      },
      {
        id: "hkex-ap-phip-20260521",
        section: "港股递表/聆讯",
        type: "AP / PHIP 更新",
        status: "3 家递表 / 2 家过聆讯",
        company: {
          zh: "港交所 AP & PHIP 页面日内更新监控",
          en: "HKEX AP & PHIP Monitor",
          display: "港交所 AP & PHIP 页面日内更新监控",
          ticker: null,
          exchange: "HKEX",
          board: "Application Proof / PHIP",
          listingStructure: "多家公司"
        },
        business: {
          summary: "复核港交所 AP / PHIP 页面后，2026-05-21 实际新增 3 家上市申请及 2 家 PHIP；当前页面先展示已确认项目，后续 nightly refresh 将补充完整公司清单及中介机构信息。",
          sector: "港股 IPO pipeline"
        },
        metrics: { apNewCount: 3, phipCount: 2 },
        monitorItems: [
          "新递交上市申请：3 家",
          "过聆讯/PHIP：2 家",
          "当前展示字段：公司中英文名、AP/PHIP日期、行业方向、保荐人、上市架构及业务简介"
        ],
        apApplications: [
          { nameEn: "Bethel Automotive Safety Systems Co., Ltd.", nameZh: "伯特利汽车安全系统股份有限公司", filingDate: "2026-05-21", documentType: "Application Proof (1st submission)", status: "新递表", sector: "汽车安全系统 / 汽车零部件", structure: "A+H", sponsors: "华泰国际、摩根士丹利", businessSummary: "汽车制动系统与智能底盘零部件供应商，客户覆盖多家新能源车企。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Liuliumei Co., Ltd. (formerly known as Liuliu Orchard Group Co., Ltd.)", nameZh: "溜溜梅股份有限公司", filingDate: "2026-05-21", documentType: "Application Proof (1st submission)", status: "新递表", sector: "休闲食品 / 青梅制品", structure: "H股", sponsors: "中信证券、国元国际", businessSummary: "以青梅制品为核心的中国休闲食品企业，主营果类零食及相关消费品。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Nanjing Silicon Intelligence Technology Group Co., Ltd.", nameZh: "南京硅基智能科技集团股份有限公司", filingDate: "2026-05-21", documentType: "Application Proof (1st submission)", status: "新递表", sector: "人工智能 / 数字人智能体", structure: "H股", sponsors: "招银国际、DBS", businessSummary: "数字人智能交互解决方案提供商，覆盖数字内容生成、智能交互及企业级AI应用场景。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Beijing Shougang Langze Technology Co., Ltd.", nameZh: "北京首钢朗泽科技股份有限公司", filingDate: "2026-05-21", documentType: "PHIP / Post Hearing Information Pack", status: "PHIP", sector: "低碳生物制造 / 工业尾气资源化", structure: "H股", sponsors: "越秀融资", businessSummary: "低碳生物制造企业，将工业尾气转化为乙醇、微生物蛋白等商业化产品。", prospectusLink: "Application Proof / PHIP" },
          { nameEn: "Tianchen Biopharmaceutical (Suzhou) Co., Ltd.", nameZh: "天辰生物医药（苏州）股份有限公司", filingDate: "2026-05-21", documentType: "PHIP / Post Hearing Information Pack", status: "PHIP", sector: "生物医药 / 过敏及自身免疫疾病", structure: "H股 + 全流通", sponsors: "国金证券（香港）", businessSummary: "临床阶段生物制药公司，专注于过敏性及自身免疫性疾病生物药物的自主发现与开发。", prospectusLink: "Application Proof / PHIP" }
        ],
        links: ["Application Proof / PHIP"]
      },
      {
        id: "csrc-no-new-20260521",
        section: "证监会备案",
        type: "境外上市备案",
        status: "无新增",
        company: {
          zh: "今日未见新增境外上市备案公示",
          en: "No New CSRC Overseas Listing Filing",
          display: "今日未见新增境外上市备案公示",
          exchange: "CSRC",
          board: "境外发行上市备案",
          listingStructure: "不适用"
        },
        business: {
          summary: "2026-05-21 当日未见新增备案完成或新增补充材料事项。",
          sector: "境外上市备案监控"
        },
        monitorItems: [
          "备案通知书：未见新增样例",
          "补充材料要求：未见新增样例",
          "备案情况表：持续监控中"
        ],
        links: ["CSRC 境外发行上市备案"]
      }
    ]
  }
};

const reportDates = Object.keys(dailyReports).sort().reverse();

const sections = ["全部", "港股新挂牌", "港股递表/聆讯", "证监会备案", "美股中概"];

const sectionTheme = {
  "港股新挂牌": {
    soft: "bg-sky-50 text-sky-700 border-sky-200",
    card: "border-sky-100 bg-sky-50/45",
    dot: "bg-sky-500",
    ring: "ring-sky-100"
  },
  "港股递表/聆讯": {
    soft: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "border-emerald-100 bg-emerald-50/35",
    dot: "bg-emerald-500",
    ring: "ring-emerald-100"
  },
  "证监会备案": {
    soft: "bg-violet-50 text-violet-700 border-violet-200",
    card: "border-violet-100 bg-violet-50/35",
    dot: "bg-violet-500",
    ring: "ring-violet-100"
  },
  "美股中概": {
    soft: "bg-amber-50 text-amber-700 border-amber-200",
    card: "border-amber-100 bg-amber-50/35",
    dot: "bg-amber-500",
    ring: "ring-amber-100"
  }
};

const typeBadgeClass = {
  "今日新上市": "bg-sky-50 text-sky-700 border-sky-200",
  "新递交上市申请": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "AP / PHIP 更新": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "备案通知书 / 备案完成": "bg-violet-50 text-violet-700 border-violet-200",
  "备案通知书 / 全流通": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "补充材料要求公示": "bg-rose-50 text-rose-700 border-rose-200",
  "境外上市备案": "bg-violet-50 text-violet-700 border-violet-200"
};

const metricCards = [
  { key: "港股新挂牌", label: "港股 IPO 新挂牌", countKey: "ipo" },
  { key: "港股递表/聆讯", label: "港股递表/聆讯更新", countKey: "hkex" },
  { key: "证监会备案", label: "证监会备案新增", countKey: "csrc" },
  { key: "美股中概", label: "美股中概 IPO 事件", countKey: "us" }
];

function sumMetric(deals, metric) {
  return deals.reduce((total, item) => total + (item.metrics?.[metric] || 0), 0);
}

export default function CapitalMarketsDailyDashboard() {
  const [selectedDate, setSelectedDate] = useState(reportDates[0]);
  const [section, setSection] = useState("全部");
  const [query, setQuery] = useState("");
  const [searchScope, setSearchScope] = useState("current");

  const activeReport = dailyReports[selectedDate];
  const deals = activeReport.deals || [];

  const allDeals = useMemo(() => {
    return Object.values(dailyReports).flatMap((report) =>
      (report.deals || []).map((deal) => ({
        ...deal,
        reportDate: report.date,
        reportTitle: report.title
      }))
    );
  }, []);

  const sourceDeals = searchScope === "all" && query.trim() ? allDeals : deals;

  const filtered = useMemo(() => {
    return sourceDeals.filter((item) => {
      const isEmptySection = (
        (item.section === "港股新挂牌" && item.status === "无新增") ||
        (item.section === "证监会备案" && item.status === "无新增") ||
        (item.section === "美股中概" && item.status === "无新增") ||
        ((item.type === "AP / PHIP 更新" || item.type === "新递交上市申请") && ((item.metrics?.apNewCount || 0) + (item.metrics?.phipCount || 0) === 0))
      );

      if (section !== "全部" && item.section !== section) return false;

      if (section !== "全部" && isEmptySection) return false;
      if (searchScope === "all" && query.trim() && isEmptySection) return false;

      const q = query.trim().toLowerCase();
      const searchable = [
        item.company?.display,
        item.company?.zh,
        item.company?.en,
        item.company?.ticker,
        item.company?.exchange,
        item.type,
        item.business?.summary,
        item.business?.sector,
        item.reportDate,
        item.reportTitle,
        item.company?.listingStructure,
        item.intermediaries?.sponsors?.join(" "),
        item.intermediaries?.globalCoordinators?.join(" "),
        item.intermediaries?.bookrunners?.join(" "),
        item.apApplications?.map((app) => [app.nameZh, app.nameEn, app.structure, app.sponsors, app.businessSummary, app.sector].join(" ")).join(" "),
        item.csrcKeyIssues?.join(" "),
        item.csrcSupplement?.companies?.map((c) => [c.name, c.likelyMarket, ...(c.coreIssues || [])].join(" ")).join(" ")
      ].filter(Boolean).join(" ").toLowerCase();

      return !q || searchable.includes(q);
    });
  }, [section, query, sourceDeals, searchScope]);

  const counts = {
    ipo: deals.filter((d) => d.section === "港股新挂牌" && d.type === "今日新上市" && d.status !== "无新增").length,
    hkex: sumMetric(deals, "apNewCount") + sumMetric(deals, "phipCount"),
    csrc: deals.filter((d) => d.section === "证监会备案" && d.status !== "无新增").length,
    us: deals.filter((d) => d.section === "美股中概" && !["待确认", "无新增", "初版未见重点新增"].includes(d.status)).length
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Landmark className="h-4 w-4" />
                资本市场日更 · 港股 IPO / 备案 / 美股中概
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">每日资本市场信息更新</h1>
              <p className="mt-2 text-sm text-slate-500">{activeReport.date} · {activeReport.title} · 官方披露优先</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
              >
                {reportDates.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <Button variant="outline" className="rounded-2xl">导出 PDF</Button>
              <Button className="rounded-2xl">更新今日数据</Button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {metricCards.map((m) => {
            const active = section === m.key;
            const theme = sectionTheme[m.key];
            return (
              <button
                key={m.key}
                onClick={() => setSection(active ? "全部" : m.key)}
                className={`rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${theme.card} ${active ? `ring-2 ${theme.ring}` : ""}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-600">{m.label}</p>
                  <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                </div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{counts[m.countKey]}</p>
                <p className="mt-1 text-xs text-slate-500">点击筛选该类别</p>
              </button>
            );
          })}
        </section>

        <Card className="rounded-3xl border-amber-100 bg-amber-50/60 shadow-sm">
          <CardContent className="flex gap-3 p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">市场观察 / Market Observations</p>
              <div className="mt-2 space-y-2 text-sm text-slate-700">
                {(activeReport.observations || []).map((text) => <p key={text}>• {text}</p>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSection("全部")}
              className={`rounded-2xl border px-4 py-2 text-sm transition ${section === "全部" ? "border-slate-300 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-white/70 text-slate-500 hover:bg-white"}`}
            >
              全部
            </button>
            <span className="text-xs text-slate-400">数字看板已支持直接筛选</span>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex rounded-2xl border border-slate-200 bg-white p-1 text-xs shadow-sm">
              <button
                onClick={() => setSearchScope("current")}
                className={`rounded-xl px-3 py-1.5 transition ${searchScope === "current" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              >
                当前日报
              </button>
              <button
                onClick={() => setSearchScope("all")}
                className={`rounded-xl px-3 py-1.5 transition ${searchScope === "all" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              >
                全历史归档
              </button>
            </div>
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchScope === "all" ? "搜索全部历史归档" : "搜索当前日报"} className="rounded-2xl bg-white pl-9" />
            </div>
          </div>
        </div>

        <section className="grid gap-4">
          {filtered.length === 0 && section !== "全部" && (
            <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div>
                  <p className="text-lg font-semibold text-slate-900">该类别当日暂无新增事件</p>
                  <p className="mt-2 text-sm text-slate-500">你仍可通过官方数据源查看完整市场动态或历史披露。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section === "港股新挂牌" && (
                    <a href={linkMap["HKEX Newly Listed Securities"]} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <FileText className="mr-2 h-4 w-4" />HKEX Newly Listed Securities<ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  )}
                  {section === "港股递表/聆讯" && (
                    <a href={linkMap["Application Proof / PHIP"]} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <FileText className="mr-2 h-4 w-4" />Application Proof / PHIP<ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  )}
                  {section === "证监会备案" && (
                    <a href={linkMap["CSRC 境外发行上市备案"]} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <FileText className="mr-2 h-4 w-4" />CSRC 境外发行上市备案<ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  )}
                  {section === "美股中概" && (
                    <a href={linkMap["SEC EDGAR Latest Filings"]} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <FileText className="mr-2 h-4 w-4" />SEC EDGAR Latest Filings<ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {filtered.map((item, idx) => (
            <Card key={idx} className="rounded-3xl border border-slate-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`rounded-xl border ${sectionTheme[item.section]?.soft || "bg-slate-100 text-slate-700 border-slate-200"}`}>{item.section}</Badge>
                      <Badge variant="outline" className={`rounded-xl border ${typeBadgeClass[item.type] || "bg-slate-50 text-slate-700 border-slate-200"}`}>{item.type}</Badge>
                      <span className="text-sm text-slate-500">{[item.company?.exchange, item.company?.board, item.company?.listingStructure].filter(Boolean).join(" · ")}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{item.company?.display}</h2>
                      {item.reportDate && (
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-500">来源日期：{item.reportDate}</span>
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
                  <Badge className="w-fit rounded-xl">{item.status}</Badge>
                </div>
                {item.ipo ? (
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                      <TrendingUp className="mb-2 h-4 w-4" />
                      发行概况：{(item.ipo.sharesOffered / 1000000).toFixed(4)}m H股；发行价 {item.ipo.currency}${item.ipo.offerPrice}; 募资总额约 {item.ipo.currency}${(item.ipo.grossProceeds / 1000000000).toFixed(3)}bn；上市市值约 {item.ipo.currency}${(item.ipo.marketCapAtListing / 100000000).toFixed(2)}亿
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                      <TrendingUp className="mb-2 h-4 w-4" />
                      认购分配：香港公开发售有效申请 {item.ipo.publicOfferApplications?.toLocaleString()} 份；超购 {item.ipo.publicOfferOversubscription}x；国际发售超购 {item.ipo.internationalOfferOversubscription}x；{item.ipo.clawback}
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                      <TrendingUp className="mb-2 h-4 w-4" />
                      基石投资者：{item.ipo.cornerstone?.map((c) => c.name).join("、")}；合计获配 {(item.ipo.cornerstoneTotalShares / 1000000).toFixed(4)}m 股，占发售股份约 {item.ipo.cornerstonePctOfOffer}%
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {(item.csrcKeyIssues || item.monitorItems || []).map((h) => (
                      <div key={h} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                        <TrendingUp className="mb-2 h-4 w-4" />
                        {h}
                      </div>
                    ))}
                  </div>
                )}
                {item.apApplications && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">AP / PHIP 公司明细</p>
                      {item.metrics?.apNewCount > 0 && (
                        <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                          NEW AP：{item.metrics.apNewCount}
                        </span>
                      )}
                      {item.metrics?.phipCount > 0 && (
                        <span className="rounded-xl border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          PHIP：{item.metrics.phipCount}
                        </span>
                      )}
                    </div>

                    {item.apApplications.filter((x) => x.status?.includes("递表") || x.documentType?.includes("Application Proof")).length > 0 && (
                      <div className="mb-5">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <p className="text-sm font-semibold text-slate-900">新递交上市申请 / NEW AP</p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          {item.apApplications
                            .filter((x) => x.status?.includes("递表") || x.documentType?.includes("Application Proof"))
                            .map((app) => (
                              <div key={`${app.nameEn}-${app.filingDate}`} className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{app.status}</span>
                                  <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs text-slate-600">{app.documentType}</span>
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
                                    <FileText className="mr-2 h-3.5 w-3.5" />招股书 / AP 文件<ExternalLink className="ml-2 h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {item.apApplications.filter((x) => x.status?.includes("PHIP") || x.documentType?.includes("PHIP")).length > 0 && (
                      <div>
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <p className="text-sm font-semibold text-slate-900">过聆讯 / PHIP</p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          {item.apApplications
                            .filter((x) => x.status?.includes("PHIP") || x.documentType?.includes("PHIP"))
                            .map((app) => (
                              <div key={`${app.nameEn}-${app.filingDate}`} className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-xl border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">PHIP</span>
                                  <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs text-slate-600">{app.documentType}</span>
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
                                    <FileText className="mr-2 h-3.5 w-3.5" />PHIP / 聆讯后资料集<ExternalLink className="ml-2 h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {item.csrc && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-900">备案通知书要点</p>
                    <div className="grid gap-2 md:grid-cols-3">
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">文号：{item.csrc.noticeNo}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">拟上市地：{item.csrc.targetMarket}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">发行上限：{item.csrc.maxIssuance}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">境内运营实体：{item.csrc.domesticOperatingEntity}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">通知书日期：{item.csrc.noticeDate}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">官网披露日期：{item.csrc.publishDate}</div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {(item.csrc.postFilingObligations || []).map((t) => <li key={t}>• {t}</li>)}
                    </ul>
                  </div>
                )}
                {item.csrcSupplement && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-900">补充材料要求明细</p>
                    <p className="mb-4 text-sm text-slate-600">公示期间：{item.csrcSupplement.period}；披露日期：{item.csrcSupplement.publishDate}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {(item.csrcSupplement.companies || []).map((c) => (
                        <div key={c.name} className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                          <p className="font-medium text-slate-900">{c.name}</p>
                          <p className="mt-1 text-xs text-slate-500">拟上市市场：{c.likelyMarket}</p>
                          <ul className="mt-3 space-y-1">
                            {(c.coreIssues || []).map((x) => <li key={x}>• {x}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.marketPerformance && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-900">首日及最新市场表现</p>
                    <div className="grid gap-2 md:grid-cols-4">
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">发行价：HK${item.marketPerformance.offerPrice}</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">首日开盘：HK${item.marketPerformance.openPrice}，较发行价 {item.marketPerformance.openChangePctVsOffer}%</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">首日收盘：HK${item.marketPerformance.firstDayClose}，较发行价 {item.marketPerformance.firstDayCloseChangePctVsOffer}%</div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm">最新/今日：{item.marketPerformance.latestPrice ? `HK$${item.marketPerformance.latestPrice}，${item.marketPerformance.latestChangePct}%` : item.marketPerformance.latestPriceNote}</div>
                    </div>
                  </div>
                )}
                {(item.timeline || item.intermediaries) && (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {item.timeline && (
                      <div className="rounded-2xl border border-slate-100 bg-white p-4">
                        <p className="mb-3 text-sm font-medium text-slate-900">历史上市申请 / 中国证监会备案时间</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          {item.timeline.firstFilingDate && <li>• 首次递表：{item.timeline.firstFilingDate}</li>}
                          {item.timeline.refilingDate && <li>• 再次递表：{item.timeline.refilingDate}{item.timeline.refilingNote ? `（${item.timeline.refilingNote}）` : ""}</li>}
                          {item.timeline.csrcAcceptanceDate && <li>• 中国证监会备案申请获受理：{item.timeline.csrcAcceptanceDate}</li>}
                          {item.timeline.csrcApprovalDate && <li>• 中国证监会备案完成/备案通知书：{item.timeline.csrcApprovalDate}</li>}
                          {item.timeline.hearingDate && <li>• 过聆讯/PHIP：{item.timeline.hearingDate}{item.timeline.hearingNote ? `（${item.timeline.hearingNote}）` : ""}</li>}
                          {item.timeline.prospectusDate && <li>• 招股/刊发招股书：{item.timeline.prospectusDate}</li>}
                          {item.timeline.allotmentResultDate && <li>• 配发结果：{item.timeline.allotmentResultDate}</li>}
                          {item.timeline.listingDate && <li>• 上市日期：{item.timeline.listingDate}</li>}
                        </ul>
                      </div>
                    )}
                    {item.intermediaries && (
                      <div className="rounded-2xl border border-slate-100 bg-white p-4">
                        <p className="mb-3 text-sm font-medium text-slate-900">主要中介机构</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          {item.intermediaries.sponsors?.length > 0 && <li>• 保荐人：{item.intermediaries.sponsors.join("、")}</li>}
                          {item.intermediaries.sponsorOverallCoordinators?.length > 0 && <li>• Sponsor-Overall Coordinator：{item.intermediaries.sponsorOverallCoordinators.join("、")}</li>}
                          {item.intermediaries.overallCoordinators?.length > 0 && <li>• 整体协调人：{item.intermediaries.overallCoordinators.join("、")}</li>}
                          {item.intermediaries.globalCoordinators?.length > 0 && <li>• 全球协调人：{item.intermediaries.globalCoordinators.join("、")}</li>}
                          {item.intermediaries.bookrunners?.length > 0 && <li>• 账簿管理人：{item.intermediaries.bookrunners.join("、")}</li>}
                          {item.intermediaries.leadManagers?.length > 0 && <li>• 牵头经办人：{item.intermediaries.leadManagers.join("、")}</li>}
                          {item.intermediaries.auditors?.length > 0 && <li>• 审计师：{item.intermediaries.auditors.join("、")}</li>}
                          {item.intermediaries.issuerCounsel?.length > 0 && <li>• 公司律师：{item.intermediaries.issuerCounsel.join("、")}</li>}
                          {item.intermediaries.underwriterCounsel?.length > 0 && <li>• 承销商律师：{item.intermediaries.underwriterCounsel.join("、")}</li>}
                          {item.intermediaries.complianceAdvisor?.length > 0 && <li>• 合规顾问：{item.intermediaries.complianceAdvisor.join("、")}</li>}
                          {item.intermediaries.industryConsultant?.length > 0 && <li>• 行业顾问：{item.intermediaries.industryConsultant.join("、")}</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="mb-3 text-sm font-medium text-slate-900">官方/行情文件链接</p>
                  <div className="flex flex-wrap gap-2">
                  {(item.links || []).map((l) => (
                    <a
                      key={l}
                      href={linkMap[l] || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <FileText className="mr-2 h-4 w-4" />{l}<ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
