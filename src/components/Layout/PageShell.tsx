import type { PropsWithChildren } from 'react'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 px-4 pb-16 pt-6 sm:px-6">
      <div className="flex flex-col gap-6">{children}</div>
    </main>
  )
}
