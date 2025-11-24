import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { DeviceInfo } from '../types/data'

const bugReportSchema = z.object({
  title: z.string().min(5, 'Give a concise title (min 5 chars)'),
  description: z.string().min(10, 'Share more details (min 10 chars)'),
  date: z.string(),
  deviceInfo: z.object({
    os: z.string(),
    browser: z.string(),
    version: z.string(),
    locale: z.string(),
  }),
})

export type BugReportFormValues = z.infer<typeof bugReportSchema>

export function useBugReportForm(defaultDevice: DeviceInfo, defaultDate: string, defaultTitle?: string) {
  const initialValues = useMemo(
    () => ({
      title: defaultTitle ?? '',
      description: '',
      date: defaultDate,
      deviceInfo: defaultDevice,
    }),
    [defaultDate, defaultDevice, defaultTitle],
  )

  const form = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  return form
}
