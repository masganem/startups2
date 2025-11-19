import type { User } from '../../types/data'

interface Props {
  user: User
  onLoginToggle?: () => void
}

export function HeaderBar({ user, onLoginToggle }: Props) {
  return (
    <header className="relative overflow-hidden rounded-b-[32px] bg-gradient-to-br from-[#0b1324] via-[#101f3b] to-[#09101f] px-6 pb-8 pt-10 shadow-2xl shadow-black/40">
      <div className="absolute left-6 top-4 text-[0.65rem] uppercase tracking-[0.5em] text-sky-200/60">
        mock viewport
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.6em] text-sky-200/70">report hub</p>
          <div>
            <h1 className="text-3xl font-semibold text-white">Bug bounty console</h1>
            <p className="mt-1 text-sm text-slate-200">
              Pick a company, share what broke, and signal the best bug hunters.
            </p>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80"
            onClick={() => onLoginToggle?.()}
            disabled={!onLoginToggle}
          >
            browse search
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-3xl bg-white/5 px-4 py-5 text-center">
          <div className="h-12 w-12 rounded-full bg-white/10 text-xl font-semibold leading-[3rem] text-white">
            {user.avatar}
          </div>
          <p className="text-xs text-slate-200">{user.name}</p>
          {onLoginToggle && (
            <button
              type="button"
              className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-400 underline decoration-dotted underline-offset-4"
              onClick={() => onLoginToggle?.()}
            >
              log in as company
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
