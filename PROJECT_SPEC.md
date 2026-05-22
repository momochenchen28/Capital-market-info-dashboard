# Capital Markets Dashboard Project Spec

## 1. Project Overview

This project is a daily capital markets dashboard focused on:

1. Hong Kong IPO market
2. HKEX Application Proof / PHIP updates
3. CSRC overseas listing filings
4. US-listed Chinese IPOs / SEC filings

The dashboard should function as:
- a daily IPO intelligence monitor
- a searchable historical archive
- a semi-automated market data reporting system

The project is designed for future migration into:
- GitHub
- Codex
- Vercel deployment
- automatic data refresh workflow

---

# 2. Core Dashboard Sections

## A. 港股 IPO 新挂牌 (HK IPO New Listings)

Track newly listed HKEX IPO companies.

Each company should include:

### Basic Information
- Chinese name
- English name
- ticker
- exchange
- board
- listing structure
  - H share
  - Red-chip
  - VIE
  - A+H
  - others

### Business Information
- business summary
- sector

### IPO Information
- offer price
- shares offered
- fundraising amount
- market cap at listing
- public offer oversubscription
- international offer oversubscription
- clawback situation
- cornerstone investors

### Market Performance
- open price
- open change %
- first day close
- latest price
- latest price change %

### Timeline
- first filing date
- refiling date(s)
- hearing date
- prospectus date
- allotment result date
- listing date
- CSRC filing acceptance date
- CSRC filing approval date

### Intermediaries
- sponsors
- sponsor overall coordinators
- overall coordinators
- global coordinators
- bookrunners
- lead managers
- auditors
- issuer counsel
- underwriter counsel
- compliance advisor
- industry consultant

### Links
- prospectus
- allotment results
- PHIP
- HKEX listing page

---

## B. 港股递表 / 聆讯 (HKEX AP / PHIP)

Track:
- Application Proof
- PHIP
- updated OC/AP filings

IMPORTANT:
- AP and PHIP MUST be displayed separately
- counts must match detailed company entries

Each AP / PHIP company should include:
- Chinese name
- English name
- filing date
- document type
- listing structure
- sponsors
- sector
- business summary
- prospectus/AP/PHIP link

---

## C. 中国证监会备案 (CSRC Filing)

Track:
- overseas listing filing approvals
- supplementary material requests
- filing acceptance notices

Each filing should include:
- company info
- target market
- listing structure
- filing notice number
- filing timeline
- core regulatory issues

Listing structure determination rules:
- structure classification must NOT be over-inferred
- if uncertain:
  - mark confidence level
  - specify source basis
- SEC/F-1 structure disclosure preferred for US listings

Supplementary material disclosure should include:
- company-level issues
- grouped by company
- clearly summarize regulatory focus areas

---

## D. 美股中概 IPO (US-listed Chinese IPOs)

Track:
- F-1
- F-1/A
- EFFECT
- 8-A
- pricing
- listing

Sources:
- SEC EDGAR
- Nasdaq
- NYSE

Include:
- company intro
- structure
- filing stage
- target exchange
- timeline
- links

---

# 3. Search Rules

Dashboard must support:

## Current Report Search
Search only current selected date.

## Historical Search
Search across ALL archived reports.

Searchable fields:
- Chinese name
- English name
- ticker
- sponsors
- structure
- sector
- business summary
- intermediaries
- AP/PHIP content
- CSRC issues

---

# 4. Empty-State Rules

If a section has no new events:

DO NOT display empty tables.

Instead display:

"该类别当日暂无新增事件"

And preserve:
- official source links

---

# 5. UI / Presentation Rules

## Section Color Themes

港股新挂牌:
- blue

港股递表/聆讯:
- green

证监会备案:
- purple

美股中概:
- amber

## AP / PHIP Display Rules

Top:
- summary metrics

Below:
- detailed company cards

NEW AP:
- green label

PHIP:
- blue label

---

# 6. Data Consistency Rules

IMPORTANT:

Metrics and detailed company entries MUST always match.

Forbidden:
- updating only top metrics
- missing company detail updates

If AP count changes:
- company detail section MUST also update

---

# 7. Historical Archive Rules

Historical reports should remain queryable.

Current implementation:
- dailyReports object

Future implementation:
- data.json
- database/API

---

# 8. Future Technical Migration Plan

Current:
- single App.jsx prototype

Planned:
- React components
- external data.json
- automated fetch scripts
- GitHub Actions
- Vercel deployment

---

# 9. Planned Automation

Future scripts:

- fetchHkexListings.js
- fetchHkexApPhip.js
- fetchCsrc.js
- fetchSecChinaIpo.js

Workflow:
1. fetch raw data
2. normalize schema
3. update data.json
4. trigger deployment

---

# 10. Official Data Sources

HKEX:
https://www.hkex.com.hk/

HKEX AP/PHIP:
https://www1.hkexnews.hk/app/appindex.html

CSRC:
https://www.csrc.gov.cn/

SEC EDGAR:
https://www.sec.gov/search-filings

Nasdaq:
https://www.nasdaq.com/

NYSE:
https://www.nyse.com/

---

# 11. Codex Instructions

When modifying the project:

1. Preserve existing UI
2. Preserve schema compatibility
3. Never silently remove fields
4. Do not over-infer company structure
5. AP / PHIP must remain separated
6. Metrics must match details
7. Empty sections should use unified wording
8. Historical search must remain functional

Priority order:
1. correctness
2. data completeness
3. schema consistency
4. UI aesthetics
