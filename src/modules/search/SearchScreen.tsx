import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompanyCard } from '../../components/Cards/CompanyCard'
import { useInfiniteCompanies } from '../../hooks/useCompanies'
import { useUIStore } from '../../store/uiStore'
import type { Service } from '../../types/data'

export function SearchScreen() {
  const navigate = useNavigate()
  const setSelectedService = useUIStore((state) => state.setSelectedService)
  const [searchTerm, setSearchTerm] = useState('')
  const companiesQuery = useInfiniteCompanies(searchTerm)

  const companies = useMemo(
    () => companiesQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [companiesQuery.data],
  )

  const handleReport = (companyId: string, service: Service) => {
    setSelectedService(service)
    navigate('/report', { state: { companyId, serviceId: service.id } })
  }

  const handleCompanySelect = (companyId: string) => {
    navigate(`/company/${companyId}`)
  }

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">search</p>
        <div className="flex gap-2">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search company or service"
            className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            className="rounded-2xl border border-slate-700 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
            onClick={() => setSearchTerm('')}
          >
            clear
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {companiesQuery.isLoading && <p className="text-sm text-slate-400">warming up companies…</p>}
        {companies.length === 0 && !companiesQuery.isLoading && (
          <p className="text-sm text-slate-500">no companies match that query yet.</p>
        )}
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onSelectCompany={handleCompanySelect}
            onReport={handleReport}
          />
        ))}
      </div>

      {companiesQuery.hasNextPage && (
        <button
          type="button"
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800"
          onClick={() => companiesQuery.fetchNextPage()}
          disabled={companiesQuery.isFetchingNextPage}
        >
          {companiesQuery.isFetchingNextPage ? 'loading more…' : 'load more'}
        </button>
      )}
    </section>
  )
}
