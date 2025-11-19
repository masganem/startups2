import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { submitBugReport } from '../../services/mockApi'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import { useBugReportForm, type BugReportFormValues } from '../../hooks/useBugReportForm'
import { useUIStore } from '../../store/uiStore'
import { companies } from '../../data/mockData'

export function ReportBugScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { device, refresh } = useDeviceInfo()
  const setDeviceInfo = useUIStore((state) => state.setDeviceInfo)

  const state = location.state as { companyId?: string; serviceId?: string } | null
  const companyId = state?.companyId ?? companies[0]?.id
  const serviceId = state?.serviceId ?? useUIStore.getState().selectedService?.id
  const service =
    companies
      .flatMap((company) => company.services)
      .find((candidate) => candidate.id === serviceId) ?? companies[0]?.services[0]

  const defaultDate = new Date().toISOString().slice(0, 10)
  const form = useBugReportForm(device, defaultDate)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  useEffect(() => {
    setDeviceInfo(device)
  }, [device, setDeviceInfo])

  const [uploadList, setUploadList] = useState<string[]>([])

  const onSubmit: SubmitHandler<BugReportFormValues> = async (values) => {
    if (!serviceId) return
    await submitBugReport({
      serviceId,
      title: values.title,
      description: values.description,
      deviceInfo: values.deviceInfo,
      attachments: uploadList,
    })
    navigate(companyId ? `/company/${companyId}` : '/search')
  }

  if (!service) {
    return <p className="text-sm text-slate-400">Select a service first.</p>
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">reporting for</p>
        <h3 className="text-2xl font-semibold text-white">{service.name}</h3>
        <p className="text-sm text-slate-400">{companies.find((c) => c.id === companyId)?.name}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.4em] text-slate-500">title</label>
          <input
            type="text"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
            {...register('title')}
            placeholder="e.g. Dashboard crashes when rotating"
          />
          {errors.title && <p className="text-xs text-rose-400">{errors.title.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.4em] text-slate-500">description</label>
          <textarea
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
            rows={4}
            {...register('description')}
            placeholder="Describe the steps and expectations"
          />
          {errors.description && <p className="text-xs text-rose-400">{errors.description.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.4em] text-slate-500">date</label>
          <input
            type="date"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
            {...register('date')}
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">device info</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {(['os', 'browser', 'version', 'locale'] as const).map((field) => (
              <div key={field} className="space-y-1">
                <label className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-500">{field}</label>
                <input
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
                  {...register(`deviceInfo.${field}` as const)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-700 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-slate-400"
            onClick={() => refresh()}
          >
            autofill from device
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">media</p>
          <label className="flex items-center justify-between rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span>upload screenshots</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(event) => {
                const names = Array.from(event.target.files ?? []).map((file) => file.name)
                setUploadList(names)
              }}
            />
          </label>
          {uploadList.length > 0 && (
            <p className="text-xs text-slate-400">{uploadList.join(', ')}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-primary to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          submit report
        </button>
      </form>
    </section>
  )
}
