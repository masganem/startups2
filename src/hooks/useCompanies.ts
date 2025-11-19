import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchCompanies } from '../services/mockApi'

export function useInfiniteCompanies(searchTerm: string) {
  return useInfiniteQuery({
    queryKey: ['companies', searchTerm],
    queryFn: ({ pageParam = 0 }) => fetchCompanies({ cursor: pageParam, searchTerm }),
    getNextPageParam: (last) => last.nextCursor,
  })
}
