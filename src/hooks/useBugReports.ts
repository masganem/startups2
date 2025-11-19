import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBugReports } from '../services/mockApi'

export function useInfiniteBugReports(serviceId: string) {
  return useInfiniteQuery({
    enabled: Boolean(serviceId),
    queryKey: ['bugReports', serviceId],
    queryFn: ({ pageParam = 0 }) => fetchBugReports({ serviceId, cursor: pageParam }),
    getNextPageParam: (last) => last.nextCursor,
  })
}
