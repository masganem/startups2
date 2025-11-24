import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBugReports } from '../services/mockApi'

export function useInfiniteBugReports() {
  return useInfiniteQuery({
    queryKey: ['bugReports'],
    queryFn: ({ pageParam = 0 }) => fetchBugReports({ cursor: pageParam }),
    getNextPageParam: (last) => last.nextCursor,
  })
}
