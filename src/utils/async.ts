export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function paginate<T>(items: T[], cursor: number, limit: number) {
  const start = cursor
  const page = items.slice(start, start + limit)
  const nextCursor = start + page.length < items.length ? start + page.length : null
  return { data: page, nextCursor }
}
