import { useNavigate } from 'react-router-dom'

export function StartScreen() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/60 backdrop-blur">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">mock access</p>
        <h1 className="text-3xl font-bold text-white">
          Drop a bug, get noticed.
        </h1>
        <p className="text-sm text-slate-300">
          Explore security bounties, pick a company, and report issues without leaving this sandbox.
        </p>
      </div>
      <button
        type="button"
        className="rounded-2xl bg-gradient-to-r from-primary to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
        onClick={() => navigate('/search')}
      >
        browse companies
      </button>
      <p className="text-center text-xs uppercase tracking-[0.4em] text-slate-500">only user role is active</p>
    </section>
  )
}
