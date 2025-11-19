import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBugReports, fetchCompanyById, endorseBugReport } from '../../services/mockApi'
import { useInfiniteBugReports } from '../../hooks/useBugReports'
import { useUIStore } from '../../store/uiStore'
import { BugReportCard } from '../../components/Cards/BugReportCard'
import { formatCurrency } from '../../utils/formatters'

export function CompanyScreen() {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const queryClient = useQueryClient()
  const setSelectedService = useUIStore((state) => state.setSelectedService)

  const companyQuery = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId ?? ''),
    enabled: Boolean(companyId),
  })

  const serviceId = companyQuery.data?.services[0]?.id ?? ''
  const bugReportsQuery = useInfiniteBugReports(serviceId)

  const handleReport = useCallback(() => {
    const service = companyQuery.data?.services[0]

    if (service && companyId) {
      setSelectedService(service)
      navigate('/report', { state: { companyId, serviceId: service.id } })
    }
  }, [companyId, companyQuery.data, navigate, setSelectedService])

  const handleEndorse = useCallback(
    async (reportId: string) => {
      await endorseBugReport(reportId)
      queryClient.invalidateQueries(['bugReports', serviceId])
    },
    [queryClient, serviceId],
  )

  if (companyQuery.isLoading) {
    return <p className="text-sm text-slate-400">loading company…</p>
  }

  const company = companyQuery.data

  if (!company) {
    return <p className="text-sm text-slate-400">company not found</p>
  }

  const reports = bugReportsQuery.data?.pages.flatMap((page) => page.data) ?? []

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">company</p>
            <h2 className="text-2xl font-semibold text-white">{company.name}</h2>
          </div>
          <div className="h-12 w-12 rounded-full bg-slate-800 text-center text-lg font-semibold text-white">
            {company.logo}
          </div>
        </header>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-slate-950/80 p-3">
            <p className="text-xs text-slate-500">Total bounties</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(company.totalBounties)}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-3">
            <p className="text-xs text-slate-500">Last month</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(company.lastMonthBounties)}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-3">
            <p className="text-xs text-slate-500">Reports total</p>
            <p className="text-lg font-semibold text-white">{company.totalReports}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-3">
            <p className="text-xs text-slate-500">Last month</p>
            <p className="text-lg font-semibold text-white">{company.lastMonthReports}</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-primary to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
          onClick={handleReport}
        >
          report a bug
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">open reports</p>
          <button
            type="button"
            className="text-xs font-semibold text-slate-400 underline underline-offset-4"
            onClick={() => bugReportsQuery.fetchNextPage()}
            disabled={!bugReportsQuery.hasNextPage || bugReportsQuery.isFetchingNextPage}
          >
            load more
          </button>
        </div>
        <div className="space-y-3">
          {reports.map((report) => (
            <BugReportCard key={report.id} report={report} onEndorse={handleEndorse} />
          ))}
          {!reports.length && (
            <p className="text-sm text-slate-500">No reports yet; you can create the first one.</p>
          )}
        </div>
      </div>
    </section>
  )
}
