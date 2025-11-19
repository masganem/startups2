import type { Company, Service } from '../../types/data'

interface Props {
  company: Company
  onSelectCompany: (id: string) => void
  onReport: (companyId: string, service: Service) => void
}

export function CompanyCard({ company, onSelectCompany, onReport }: Props) {
  const primaryService = company.services[0]

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-900/40 backdrop-blur">
      <button
        type="button"
        className="flex w-full flex-col gap-3 text-left"
        onClick={() => onSelectCompany(company.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 text-center text-lg font-semibold text-white">
              {company.logo}
            </div>
            <div>
              <p className="text-base font-semibold text-white">{company.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {primaryService.name}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase text-slate-400">bounties</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">Total bounties</span>
            <span className="text-base font-semibold text-white">${company.totalBounties.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">Last month</span>
            <span className="text-base font-semibold text-white">${company.lastMonthBounties.toLocaleString()}</span>
          </div>
        </div>
      </button>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-800/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
          {company.totalReports} reports
        </span>
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-primary to-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:scale-95"
          onClick={() => onReport(company.id, primaryService)}
        >
          report bug
        </button>
      </div>
    </article>
  )
}
