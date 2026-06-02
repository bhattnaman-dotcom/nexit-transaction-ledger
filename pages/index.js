import Head from "next/head";
import { transactions, netPositions, totalReceivables, totalPayables, netPosition } from "../lib/data";

const fmt = (n) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

function StatusBadge({ status }) {
  const map = {
    cleared: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    payable: "bg-rose-100 text-rose-700",
  };
  const label = { cleared: "✅ Cleared", pending: "⚠ Pending", payable: "⚠ Payable" };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
      {label[status]}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{fmt(value)}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>NexIT Transaction Ledger</title>
        <meta name="description" content="NexIT internal transaction tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">NexIT</h1>
            <p className="text-slate-400 text-sm">Transaction Ledger</p>
          </div>
          <span className="text-slate-400 text-sm">May – Jun 2026</span>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

          {/* Summary cards */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Receivables" value={totalReceivables} color="text-emerald-600" />
              <StatCard label="Total Payables"    value={totalPayables}   color="text-rose-500" />
              <StatCard label="Net Position"      value={netPosition}     color={netPosition >= 0 ? "text-emerald-600" : "text-rose-500"} />
            </div>
          </section>

          {/* Net positions */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Net Positions</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wide">
                    <th className="px-4 py-3 font-medium">Party</th>
                    <th className="px-4 py-3 font-medium">Direction</th>
                    <th className="px-4 py-3 font-medium text-right">Original</th>
                    <th className="px-4 py-3 font-medium text-right">Settled</th>
                    <th className="px-4 py-3 font-medium text-right">Balance</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {netPositions.map((pos) => (
                    <tr key={pos.party} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800">{pos.party}</td>
                      <td className="px-4 py-3 text-slate-500">{pos.direction}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{fmt(pos.original)}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{fmt(pos.settled)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${pos.balance === 0 ? "text-emerald-600" : pos.direction === "NexIT Owes" ? "text-rose-500" : "text-amber-600"}`}>
                        {fmt(pos.balance)}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={pos.status} /></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Receivables</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">{fmt(totalReceivables)}</td>
                    <td />
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Payables</td>
                    <td className="px-4 py-3 text-right font-bold text-rose-500">{fmt(totalPayables)}</td>
                    <td />
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-xs font-bold text-slate-800 uppercase">Net Position</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 text-base">{fmt(netPosition)}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* Transaction log */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Transaction Log</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wide">
                    <th className="px-4 py-3 font-medium w-10">#</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">From</th>
                    <th className="px-4 py-3 font-medium">To</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 text-xs">{tx.id}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${tx.from === "NexIT" ? "text-indigo-600" : "text-slate-700"}`}>
                          {tx.from}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${tx.to === "NexIT" ? "text-indigo-600" : "text-slate-700"}`}>
                          {tx.to}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">{fmt(tx.amount)}</td>
                      <td className="px-4 py-3 text-slate-500">{tx.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>

        <footer className="text-center text-xs text-slate-400 py-6">
          NexIT Solutions · Internal use only
        </footer>
      </div>
    </>
  );
}
