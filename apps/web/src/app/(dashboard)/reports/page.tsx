import type { FoodCostReportLine, SpendReportLine, StockValuationReport } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { FoodCostReportTable } from "@/components/reports/FoodCostReportTable";
import { SpendReportTable } from "@/components/reports/SpendReportTable";
import { StockValuationTable } from "@/components/reports/StockValuationTable";
import { DateRangeForm } from "@/components/reports/DateRangeForm";

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from: requestedFrom, to: requestedTo } = await searchParams;

  const today = new Date();
  const ninetyDaysAgo = new Date(today);
  ninetyDaysAgo.setDate(today.getDate() - 90);

  const from = requestedFrom || toDateInput(ninetyDaysAgo);
  const to = requestedTo || toDateInput(today);

  const client = await getAuthedGatewayClient();

  const [foodCost, spend, valuation] = await Promise.all([
    client.get<FoodCostReportLine[]>("/reporting/reports/food-cost"),
    client.get<SpendReportLine[]>("/reporting/reports/spend", { from, to }),
    client.get<StockValuationReport>("/reporting/reports/stock-valuation"),
  ]);

  return (
    <div className="flex animate-fade-in-up flex-col gap-8">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Reports</h1>
        <p className="text-sm text-on-surface-variant">Financial &amp; operational reporting</p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-lg font-bold text-on-surface">Food cost</h2>
        <FoodCostReportTable lines={foodCost} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-lg font-bold text-on-surface">Spend by supplier</h2>
        <DateRangeForm from={from} to={to} />
        <SpendReportTable lines={spend} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-lg font-bold text-on-surface">Stock valuation</h2>
        <StockValuationTable report={valuation} />
      </section>
    </div>
  );
}
