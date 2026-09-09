import { FileText, Download } from "lucide-react";
// import type { Invoice } from "@/lib/dashboard/types";
import { Invoice } from "../../lib/types";

export default function InvoicesCard({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-action-tint-bg text-action">
          <FileText size={16} />
        </span>
        <div>
          <p className="font-heading text-base font-bold text-ink">Invoices</p>
          <p className="text-xs text-muted">
            Every payment, with a downloadable receipt.
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wide text-muted">
              <th className="pb-2 font-semibold">Invoice</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Date</th>
              <th className="pb-2 font-semibold">Amount</th>
              <th className="pb-2 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.number} className="border-t border-border">
                <td className="py-3 font-medium text-ink">{inv.number}</td>
                <td className="py-3">
                  <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                    {inv.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-secondary">{inv.date}</td>
                <td className="py-3 font-medium text-ink">${inv.amount}</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    aria-label="Download receipt"
                    className="text-muted hover:text-ink"
                  >
                    <Download size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
