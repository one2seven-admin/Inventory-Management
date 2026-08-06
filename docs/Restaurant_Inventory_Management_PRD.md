# PRODUCT REQUIREMENTS DOCUMENT
## Restaurant Inventory Management System
### Web Application + Mobile App (iOS & Android)

**Document Version:** 1.0
**Status:** Draft for Review
**Date:** August 7, 2026
**Prepared For:** Restaurant Operations, Purchasing, Kitchen & F&B Management Teams
**Product:** Smart Inventory — Restaurant Inventory & Stock Management Platform

*Confidential — Internal Planning Document*

---

## 1. Document Overview

### 1.1 Purpose
This Product Requirements Document (PRD) defines the complete functional and non-functional scope for a restaurant Inventory Management System delivered as a responsive Web Application and native Mobile Apps (iOS and Android). The system is designed to give restaurant owners, kitchen managers, purchasing staff, and multi-location operators real-time visibility and control over stock, purchasing, recipes, wastage, and cost — replacing manual spreadsheets and disconnected tools.

### 1.2 Scope
The scope covers end-to-end inventory lifecycle management: item master data, unit of measure conversions, supplier and purchase order management, goods receiving, recipe-based (BOM) stock deduction, transfers between locations, wastage tracking, batch/expiry tracking, barcode/QR workflows, automated reordering, demand forecasting, POS and accounting integrations, role-based access, and analytics/reporting — available on both web and mobile with offline support for on-the-floor use.

### 1.3 Definitions & Acronyms

| Term | Definition |
|---|---|
| SKU | Stock Keeping Unit — a unique identifier for an inventory item |
| UoM | Unit of Measure (e.g., kg, litre, piece, case) |
| BOM | Bill of Materials — the recipe-level ingredient breakdown of a menu item |
| GRN | Goods Receipt Note — record confirming receipt of purchased stock |
| PO | Purchase Order |
| PAR level | Minimum stock level that triggers reordering |
| COGS | Cost of Goods Sold |
| FIFO/LIFO | First-In-First-Out / Last-In-First-Out stock valuation methods |
| POS | Point of Sale system |

---

## 2. Product Overview

### 2.1 Problem Statement
Restaurants routinely lose 4–10% of food cost to wastage, over-ordering, theft, and untracked portion inconsistency. Manual stock counts are time-consuming and error-prone, purchasing decisions are reactive rather than data-driven, and owners lack real-time visibility into food cost percentage, supplier pricing trends, or which menu items are eroding margin. Multi-branch operators additionally struggle to standardize inventory practices and consolidate reporting across locations.

### 2.2 Goals & Objectives
- Give real-time, always-accurate stock visibility across every ingredient and location.
- Automatically deduct ingredient stock as menu items are sold, using recipe-level BOM data.
- Reduce wastage and spoilage through expiry tracking, alerts, and wastage analytics.
- Automate reordering with PAR-level alerts and AI-assisted demand forecasting.
- Provide accurate, real-time food cost % and margin analysis per dish and per category.
- Enable fast, low-friction stock counts and receiving via barcode/QR scanning on mobile.
- Support multi-branch/central-kitchen operations with inter-location transfers and consolidated reporting.
- Integrate cleanly with POS and accounting systems to avoid duplicate data entry.

### 2.3 Target Users

| Persona | Primary Needs |
|---|---|
| Restaurant Owner / GM | High-level dashboards, food cost %, wastage trends, multi-branch comparison |
| Kitchen / Head Chef | Recipe & BOM management, stock issue to kitchen, wastage logging |
| Purchasing Manager | PO creation, supplier comparison, PAR-level reorder alerts, GRN |
| Store / Inventory Clerk | Receiving, stock counts, barcode scanning, transfers, adjustments |
| Accountant / Finance | Stock valuation, COGS reports, supplier invoice reconciliation |
| Multi-unit Operations Director | Cross-location benchmarking, standardized par levels, audit trail |

### 2.4 Platforms
- **Web Application** — responsive dashboard for management, purchasing, and back-office use (desktop/tablet).
- **Mobile App (iOS & Android)** — optimized for on-the-floor and warehouse use: scanning, counting, receiving, quick wastage logging, and offline capture.
- **Shared backend and real-time sync** so any change on either platform reflects everywhere within seconds.

---

## 3. Functional Requirements

Each module below lists the core functionality required. Priority: **P0** = must-have for launch (MVP), **P1** = fast-follow, **P2** = future enhancement.

### 3.1 Item / Product Master Management

| Feature | Description | Priority |
|---|---|---|
| Item creation & catalog | Create ingredient/product records with name, category, sub-category, SKU/code, description, image, and default UoM. | P0 |
| Multi-UoM support | Define purchase UoM, storage UoM, and recipe/usage UoM per item (e.g., buy by case, store by kg, use by gram) with automatic conversion factors. | P0 |
| Category & sub-category tagging | Organize items into categories (produce, dairy, meat, dry goods, beverages, packaging, cleaning supplies, etc.). | P0 |
| Item variants | Support variants such as brand, pack size, and grade for the same base ingredient. | P1 |
| Cost tracking per item | Store last purchase price, average cost, and FIFO/weighted-average valuation. | P0 |
| Perishability flag | Mark items as perishable and define default shelf-life for expiry tracking. | P0 |
| Bulk import/export | CSV/Excel bulk upload and export of the item master with validation. | P0 |
| Barcode/QR assignment | Assign or auto-generate barcodes/QR codes per item and per unit pack. | P0 |
| Item status | Active / inactive / discontinued flags to retire items without deleting history. | P1 |
| Custom attributes | Allergen tags, nutritional notes, storage instructions (chilled/frozen/dry). | P1 |

### 3.2 Supplier / Vendor Management

| Feature | Description | Priority |
|---|---|---|
| Supplier profiles | Store contact details, payment terms, lead time, delivery schedule, and rating per supplier. | P0 |
| Item-supplier price list | Map each item to one or more suppliers with negotiated price, MOQ, and pack size. | P0 |
| Preferred supplier logic | Mark a preferred supplier per item; system defaults to it when creating POs. | P0 |
| Price comparison | Side-by-side comparison of supplier prices for the same item across time. | P1 |
| Supplier performance scorecard | Track on-time delivery %, order accuracy, and price variance per supplier. | P1 |
| Supplier documents | Attach contracts, price agreements, and certifications (e.g., food safety) to supplier profile. | P2 |

### 3.3 Purchase Order (PO) Management

| Feature | Description | Priority |
|---|---|---|
| PO creation | Create purchase orders manually or generate from low-stock/reorder suggestions. | P0 |
| Auto-suggested PO | System auto-drafts a PO when items fall below PAR level, pre-filled with preferred supplier and last price. | P0 |
| Multi-supplier PO splitting | Automatically split a single order across multiple suppliers based on item-supplier mapping. | P1 |
| Approval workflow | Configurable approval chain for POs above a spend threshold. | P0 |
| PO status tracking | Draft → Sent → Confirmed → Partially Received → Received → Closed states with timestamped history. | P0 |
| Send PO to supplier | Email/WhatsApp/PDF export of PO directly to supplier from the app. | P0 |
| Recurring/standing orders | Schedule recurring POs for routine staple items (e.g., weekly produce order). | P1 |
| Budget tracking | Compare PO spend against category or location purchasing budgets. | P2 |

### 3.4 Goods Receiving (GRN)

| Feature | Description | Priority |
|---|---|---|
| Receive against PO | Scan or select a PO and record received quantities, matching against ordered quantities. | P0 |
| Partial & over/under delivery handling | Flag and log discrepancies between ordered vs. received quantity for each line item. | P0 |
| Quality check checklist | Configurable QC checklist at receiving (temperature check, freshness, packaging integrity). | P1 |
| Batch/lot & expiry capture | Capture batch number and expiry date per received item during GRN. | P0 |
| Photo evidence | Attach photos of received goods or damaged items to the GRN record. | P1 |
| Auto stock update | Received quantities automatically increment on-hand stock and update weighted-average cost. | P0 |
| Invoice matching | Match supplier invoice amount against GRN and PO for 3-way matching. | P1 |
| Rejection / return handling | Record rejected items and generate a return/debit note to the supplier. | P1 |

### 3.5 Stock / Warehouse Management

| Feature | Description | Priority |
|---|---|---|
| Real-time on-hand stock | Live quantity on-hand per item, per location/storage area, updated instantly across web and mobile. | P0 |
| Multi-location storage | Track stock across multiple storage areas (walk-in cooler, dry store, bar, freezer) within one branch. | P0 |
| Stock valuation | FIFO, LIFO, or weighted-average costing methods, configurable per organization. | P0 |
| Physical stock count / cycle count | Guided stock-take workflow (full or cycle count) with variance report vs. system quantity. | P0 |
| Count reconciliation | One-tap approval to reconcile counted quantity to system, with reason codes for variance. | P0 |
| Min/Max & PAR level settings | Configure minimum, maximum, and PAR stock levels per item, per location. | P0 |
| Stock aging report | Identify slow-moving and aging stock by days-on-hand. | P1 |

### 3.6 Recipe & Menu Engineering (BOM)

| Feature | Description | Priority |
|---|---|---|
| Recipe builder | Define each menu item's Bill of Materials — ingredients and exact quantities per serving. | P0 |
| Sub-recipes / prep items | Support nested recipes (e.g., a sauce used across multiple dishes) that themselves consume raw ingredients. | P0 |
| Recipe costing | Auto-calculate plate cost and food-cost % per dish based on current ingredient costs. | P0 |
| Portion/yield management | Account for prep yield loss (e.g., trimming, cooking shrinkage) in cost and consumption calculations. | P1 |
| Menu engineering matrix | Classify dishes as Stars/Plowhorses/Puzzles/Dogs based on margin vs. popularity. | P2 |
| Recipe versioning | Track recipe changes over time with effective dates for historical cost accuracy. | P1 |

### 3.7 Automatic Stock Deduction (Sales-Driven Consumption)

| Feature | Description | Priority |
|---|---|---|
| POS-triggered deduction | Each sold menu item automatically deducts the corresponding recipe ingredients from stock in real time. | P0 |
| Manual stock issue | Issue stock manually to kitchen/bar stations for prep not tied to a direct POS sale. | P0 |
| Theoretical vs. actual usage | Compare theoretical consumption (from recipes & sales) against actual counted usage to surface variance/loss. | P1 |
| Modifier/combo handling | Correctly deduct ingredients for menu modifiers, combos, and customizations. | P1 |

### 3.8 Wastage & Spoilage Management

| Feature | Description | Priority |
|---|---|---|
| Wastage logging | Log wastage with item, quantity, reason (spoilage, over-prep, dropped, expired, customer return), and station. | P0 |
| Photo capture for wastage | Attach a photo when logging wastage for accountability. | P1 |
| Wastage cost impact | Auto-calculate the cost value of logged wastage and roll up into daily/weekly reports. | P0 |
| Wastage trend analytics | Trend charts by item, category, station, and shift to identify recurring loss points. | P1 |
| Expiry-driven wastage alerts | Auto-flag items nearing expiry to encourage use before they must be written off. | P0 |

### 3.9 Batch & Expiry Tracking

| Feature | Description | Priority |
|---|---|---|
| Batch/lot tracking | Track stock by batch/lot number from receiving through consumption. | P0 |
| Expiry date monitoring | Track expiry per batch and surface items expiring within a configurable window (e.g., 3 days). | P0 |
| FEFO enforcement | First-Expired-First-Out picking guidance during stock issue. | P1 |
| Automatic write-off suggestion | Suggest write-off/disposal workflow for expired, unused stock. | P1 |
| Recall support | Trace all locations/dishes a specific batch was used in, for food-safety recall scenarios. | P2 |

### 3.10 Stock Transfer (Multi-Location)

| Feature | Description | Priority |
|---|---|---|
| Inter-branch transfer requests | Create and approve stock transfer requests between branches or from a central kitchen/warehouse. | P0 |
| In-transit tracking | Track transfer status: Requested → Approved → Dispatched → Received, with quantity confirmation at both ends. | P0 |
| Transfer discrepancy handling | Flag and log short/over receipt at the destination location. | P1 |
| Central kitchen distribution | Support a central commissary model producing and distributing prepped items to multiple outlets. | P1 |

### 3.11 Stock Adjustment & Reconciliation

| Feature | Description | Priority |
|---|---|---|
| Manual adjustment | Increase/decrease stock with mandatory reason code (damage, theft, count correction, sample/comp). | P0 |
| Approval for large adjustments | Require manager approval for adjustments exceeding a configurable value/quantity threshold. | P1 |
| Adjustment audit log | Immutable log of every adjustment with user, timestamp, reason, and before/after quantity. | P0 |

### 3.12 Barcode / QR Code Workflows

| Feature | Description | Priority |
|---|---|---|
| Mobile barcode scanning | Use phone camera to scan barcodes/QR codes for receiving, counting, issuing, and transfers. | P0 |
| Label printing | Generate and print barcode/QR labels for items and batches (integration with common label printers). | P1 |
| Bluetooth scanner support | Pair external Bluetooth barcode scanners with the mobile app for high-volume scanning. | P2 |

### 3.13 Low-Stock Alerts & Automated Reordering

| Feature | Description | Priority |
|---|---|---|
| PAR-level alerts | Push/email/SMS alerts when an item drops below its PAR or reorder point. | P0 |
| Auto-generated reorder suggestions | System proposes reorder quantities based on PAR, lead time, and historical usage velocity. | P0 |
| One-tap PO conversion | Convert a reorder suggestion directly into a PO with one tap. | P0 |
| Demand forecasting (AI-assisted) | Predict upcoming ingredient demand using historical sales, seasonality, and upcoming reservations/events to refine reorder quantities. | P1 |
| Forecast accuracy feedback loop | Track forecast-vs-actual to continuously tune the forecasting model. | P2 |

### 3.14 POS & Accounting Integration

| Feature | Description | Priority |
|---|---|---|
| POS integration | Bi-directional sync with POS systems to pull sales data for auto-deduction and push menu/recipe updates. | P0 |
| Accounting/ERP integration | Push purchase and COGS data to accounting platforms (e.g., QuickBooks, Zoho Books, Tally, Xero). | P1 |
| Payment/supplier invoice sync | Sync GRNs and invoices for accounts-payable reconciliation. | P2 |
| Open API & webhooks | Documented REST API and webhooks for custom integrations. | P1 |

### 3.15 Multi-Branch / Multi-Location Management

| Feature | Description | Priority |
|---|---|---|
| Centralized multi-branch dashboard | View and compare stock, cost, and wastage KPIs across all branches from one screen. | P0 |
| Location-specific settings | Independent PAR levels, suppliers, and pricing per location while sharing a common item master. | P0 |
| Role-based location access | Restrict staff visibility/actions to their assigned location(s) only. | P0 |
| Consolidated procurement | Optionally consolidate purchasing across branches for volume-based supplier pricing. | P2 |

### 3.16 User Roles, Permissions & Authentication

| Feature | Description | Priority |
|---|---|---|
| Role-based access control (RBAC) | Predefined and custom roles (Owner, Manager, Chef, Purchasing, Store Clerk, Accountant, Auditor) with granular permissions. | P0 |
| Multi-factor authentication | Optional MFA/OTP login for web and mobile. | P1 |
| Single sign-on (SSO) | SSO support (Google Workspace/Microsoft 365) for enterprise/multi-branch operators. | P2 |
| Session & device management | View and revoke active sessions/devices per user. | P1 |

### 3.17 Reporting & Analytics Dashboard

| Feature | Description | Priority |
|---|---|---|
| Real-time dashboard | At-a-glance KPIs: stock value, food cost %, top wastage items, low-stock count, pending POs. | P0 |
| Food cost & margin reports | Per-dish, per-category, and overall food cost % with trend over time. | P0 |
| Purchase & spend reports | Spend by supplier, by category, by location, with period-over-period comparison. | P0 |
| Stock valuation report | Current inventory value by item/category/location for financial close. | P0 |
| Variance report | Theoretical vs. actual usage variance, highlighting potential loss or over-portioning. | P1 |
| Custom report builder | Drag-and-drop custom report builder with scheduled email export (PDF/Excel/CSV). | P2 |
| Cross-location benchmarking | Compare KPIs across branches to identify best/worst performers. | P1 |

### 3.18 Notifications & Alerts

| Feature | Description | Priority |
|---|---|---|
| Push notifications (mobile) | Real-time push alerts for low stock, expiring items, PO approvals, and transfer requests. | P0 |
| Email/SMS alerts | Configurable channel preferences per alert type and per user role. | P0 |
| In-app notification center | Centralized, filterable log of all notifications with read/unread status. | P1 |

### 3.19 Audit Trail & Compliance

| Feature | Description | Priority |
|---|---|---|
| Full activity audit log | Immutable log of every create/update/delete action with user, timestamp, and before/after values. | P0 |
| Exportable audit reports | Export audit logs for internal or external food-safety/financial audits. | P1 |
| Data retention policy controls | Configurable retention period for historical transaction data. | P2 |

### 3.20 Mobile-Specific Capabilities

| Feature | Description | Priority |
|---|---|---|
| Offline mode | Capture stock counts, receiving, and wastage offline; auto-sync when connectivity resumes, with conflict resolution. | P0 |
| Camera-based scanning | Native camera barcode/QR scanning without extra hardware. | P0 |
| Quick-count mode | Streamlined, large-touch-target UI for fast counting on the warehouse floor. | P0 |
| Voice-to-text notes | Voice input for wastage/adjustment reason notes. | P2 |
| Biometric login | Face ID / fingerprint login for fast, secure access. | P1 |

### 3.21 Search, Filters & Global Navigation

| Feature | Description | Priority |
|---|---|---|
| Global search | Search across items, suppliers, POs, and batches from a single search bar. | P0 |
| Advanced filters | Filter any list view by category, location, status, date range, and supplier. | P0 |
| Saved views | Save and share frequently used filter combinations. | P2 |

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Core screens (dashboard, stock list) load within 2 seconds on a standard broadband/4G connection.
- Stock quantity updates reflect across web and mobile within 5 seconds of the triggering transaction.
- System supports at least 50,000 SKUs and 100 concurrent users per organization without degradation.

### 4.2 Security
- All data encrypted in transit (TLS 1.2+) and at rest (AES-256).
- Role-based access control enforced at API level, not just UI level.
- Regular penetration testing and vulnerability scanning; responsible disclosure program.
- Compliance with applicable data protection regulations (e.g., India's DPDP Act, GDPR where relevant).

### 4.3 Scalability
- Multi-tenant architecture supporting single-outlet restaurants up to enterprise multi-branch chains.
- Horizontal scalability of backend services to handle peak-hour transaction spikes.

### 4.4 Usability & Accessibility
- Mobile-first UI for floor staff with minimal training required (target: under 15 minutes onboarding).
- WCAG 2.1 AA accessibility compliance on the web application.
- Multi-language support (starting with English and Hindi, extensible to other regional languages).

### 4.5 Reliability & Availability
- Target 99.9% uptime SLA for the web application and backend services.
- Automated daily backups with point-in-time recovery.
- Graceful offline degradation on mobile with guaranteed eventual sync.

### 4.6 Compliance
- Support for food-safety audit requirements (batch traceability, temperature logs where applicable).
- Configurable tax/GST fields on purchase and stock valuation records for Indian F&B compliance.

---

## 5. Core Data Model (Key Entities)

High-level entities and their primary relationships. Full ER diagram and field-level schema to be maintained separately in technical design documentation.

| Entity | Key Fields / Relationships |
|---|---|
| Item | SKU, name, category, UoMs, cost, supplier(s), perishable flag, barcode |
| Supplier | Name, contact, terms, item price list, performance metrics |
| Purchase Order | Supplier, items & quantities, status, approver, linked GRNs |
| GRN (Goods Receipt) | Linked PO, received quantities, batch/expiry, discrepancies |
| Stock Ledger | Item, location, transaction type, quantity, running balance, timestamp, user |
| Recipe / BOM | Menu item, ingredient list with quantities, yield %, cost |
| Location / Storage Area | Branch, storage area, PAR levels, assigned staff |
| Stock Transfer | Source & destination location, items, status, discrepancy |
| Wastage Log | Item, quantity, reason, station, cost impact, photo |
| User & Role | Credentials, role, permitted locations, permissions |
| Audit Log | Entity, action, user, timestamp, before/after values |

---

## 6. Roles & Permissions Matrix

| Capability | Owner | Manager | Chef | Purchasing | Store Clerk | Accountant |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| View dashboard & reports | Full | Full | Kitchen only | Purchasing | Limited | Financial |
| Create/edit item master | Yes | Yes | View only | Yes | View only | View only |
| Create purchase orders | Yes | Yes | No | Yes | No | View only |
| Approve purchase orders | Yes | Yes* | No | No | No | No |
| Receive goods (GRN) | Yes | Yes | No | Yes | Yes | No |
| Build/edit recipes | Yes | Yes | Yes | No | No | View only |
| Log wastage | Yes | Yes | Yes | No | Yes | No |
| Perform stock counts | Yes | Yes | Yes | No | Yes | No |
| Approve stock adjustments | Yes | Yes* | No | No | No | No |
| Manage users & roles | Yes | No | No | No | No | No |
| Export financial reports | Yes | Yes | No | No | No | Yes |

*\* Subject to configurable approval-threshold rules.*

---

## 7. Key User Flows

### 7.1 Receiving Stock (Mobile)
1. Store clerk opens the app and selects "Receive Stock."
2. Scans the PO barcode or selects the open PO from the list.
3. Scans each item's barcode; app pre-fills expected quantity.
4. Clerk confirms or edits actual received quantity and enters batch/expiry date.
5. Any discrepancy vs. ordered quantity is flagged automatically.
6. Clerk submits GRN; stock levels update instantly across web and mobile.

### 7.2 Automatic Stock Deduction on Sale
1. Customer order is placed and completed in the POS.
2. POS integration sends the sold menu item(s) to the inventory system.
3. System looks up the recipe/BOM for each sold item.
4. Ingredient quantities are deducted from the relevant location's stock ledger.
5. If resulting stock falls below PAR level, a reorder alert is triggered.

### 7.3 Low Stock → Reorder → PO → Receiving (End-to-End)
1. System detects an item has crossed its PAR/reorder threshold.
2. A reorder suggestion is generated with recommended quantity and preferred supplier.
3. Purchasing manager reviews and converts the suggestion into a PO with one tap.
4. PO routes through approval (if required) and is sent to the supplier.
5. On delivery, store clerk receives stock via the mobile GRN flow, closing the loop.

---

## 8. Technical Architecture Overview

This section provides a high-level, implementation-agnostic view; final technology selection belongs in the engineering design document.

### 8.1 Suggested Stack
- **Frontend (Web):** Responsive single-page application (e.g., React/Next.js) with role-based dashboards.
- **Mobile:** Cross-platform (e.g., React Native or Flutter) for a single codebase across iOS and Android, with native modules for camera/barcode scanning and offline storage.
- **Backend:** RESTful/GraphQL API layer with microservice-friendly domain boundaries (inventory, purchasing, recipes, reporting, notifications).
- **Database:** Relational database (e.g., PostgreSQL) for transactional integrity of stock ledgers, with a caching layer (e.g., Redis) for real-time dashboard performance.
- **Sync engine:** Conflict-resolution logic for offline-first mobile capture (last-write-wins with audit override for financial fields).
- **Integration layer:** Webhook/API connectors for POS, accounting, and label-printer integrations.

### 8.2 High-Level Data Flow

```
POS Sale → Integration Layer → Recipe Engine (BOM lookup) → Stock Ledger Update
→ PAR-Level Check → Notification/Reorder Engine → Dashboard & Reports (real-time)
```

---

## 9. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Reduction in food wastage (by value) | ≥ 20% within 6 months of adoption |
| Inventory count time (per location) | Reduced by ≥ 50% vs. manual process |
| Stock-out incidents on key items | ≥ 30% reduction |
| Food cost % accuracy vs. actual | Within ±2% of theoretical cost |
| PO-to-receiving cycle time | ≤ 24 hours on average for local suppliers |
| User adoption (daily active use by floor staff) | ≥ 85% of assigned staff within 30 days |

---

## 10. Assumptions & Constraints

### 10.1 Assumptions
- Restaurants have reliable internet connectivity at least intermittently for sync; mobile offline mode covers gaps.
- POS systems in use expose an API or webhook for sales-data integration.
- Staff have access to smartphones (owned or restaurant-issued) capable of running the mobile app.

### 10.2 Constraints
- Initial launch (MVP) will prioritize P0 features; P1/P2 items are planned for subsequent releases.
- Third-party POS/accounting integrations depend on partner API availability and may vary by region.
- Barcode/label printer integration is limited to commonly used thermal printer models at launch.

---

## 11. Release Phases / Roadmap

### Phase 1 — MVP (P0 features)
Item master, supplier & PO management, GRN, real-time stock ledger, recipe/BOM with auto-deduction, wastage logging, PAR-level alerts, manual reordering, basic reporting dashboard, RBAC, mobile scanning & offline capture.

### Phase 2 — Fast Follow (P1 features)
Auto-generated reorder suggestions, supplier price comparison & scorecards, batch/FEFO enforcement, theoretical vs. actual variance reporting, accounting integration, cross-location benchmarking, MFA.

### Phase 3 — Advanced (P2 features)
AI-assisted demand forecasting, menu engineering matrix, custom report builder, SSO, recall traceability, consolidated multi-branch procurement, Bluetooth scanner support.

---

## 12. Appendix

### 12.1 Open Questions
- Which POS platforms must be supported at launch (region-specific priority list)?
- Should stock valuation default to FIFO or weighted-average, and is this configurable per organization?
- What is the approval-threshold policy for POs and stock adjustments by default?
- Which accounting platforms are highest priority for Phase 2 integration?

### 12.2 Document History

| Version | Date | Description |
|---|---|---|
| 1.0 | Aug 7, 2026 | Initial draft PRD covering full functional and non-functional scope |
