import type { BugReport } from '../../types/data'

interface Props {
  report: BugReport
  onEndorse: (reportId: string) => void
}

export function BugReportCard({ report, onEndorse }: Props) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-900/40">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-white">{report.title}</p>
          <p className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {report.deviceInfo.os}
        </span>
      </header>
      <p className="mt-3 text-sm text-slate-300">{report.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">{report.endorsements} endorsements</span>
        <button
          type="button"
          className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100 transition hover:bg-slate-700"
          onClick={() => onEndorse(report.id)}
        >
          endorse
        </button>
      </div>
    </article>
  )
}
