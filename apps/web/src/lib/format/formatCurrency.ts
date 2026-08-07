const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

/** Renders a number as Indian Rupees with Indian digit grouping, e.g. ₹1,23,456.78. */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}
