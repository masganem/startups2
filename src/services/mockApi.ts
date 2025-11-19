import type { BugReport, Company } from '../types/data'
import { companies } from '../data/mockData'
import { delay, paginate } from '../utils/async'

let bugReportsStore: BugReport[] = []

const initializeReports = () => {
  if (bugReportsStore.length === 0) {
    const allReports = companies.flatMap((company) => company.services).flatMap((service) =>
      Array.from({ length: 8 }, (_, index) => {
        const createdAt = new Date(Date.now() - index * 1000 * 60 * 60).toISOString()
        return {
          id: `bug-${service.id}-${index}`,
          serviceId: service.id,
          title: `${service.name} ${index % 2 === 0 ? 'crashes' : 'freezes'} on mobile`,
          description: `Mock report #${index + 1} for ${service.name}`,
          attachments: [],
          deviceInfo: {
            os: 'Android 14',
            browser: 'Chrome',
            version: '1.0',
            locale: 'en-US',
          },
          createdAt,
          endorsements: index % 5,
        }
      }),
    )

    bugReportsStore = allReports
  }
}

export interface FetchCompaniesParams {
  cursor?: number
  limit?: number
  searchTerm?: string
}

export async function fetchCompanies({ cursor = 0, limit = 6, searchTerm = '' }: FetchCompaniesParams) {
  initializeReports()
  await delay(400)
  const normalizedTerm = searchTerm.trim().toLowerCase()
  const filtered = normalizedTerm
    ? companies.filter(
        (company) =>
          company.name.toLowerCase().includes(normalizedTerm) || company.services.some((service) => service.name.toLowerCase().includes(normalizedTerm)),
      )
    : companies

  const { data, nextCursor } = paginate(filtered, cursor, limit)
  return { data, nextCursor }
}

export async function fetchCompanyById(companyId: string) {
  initializeReports()
  await delay(200)
  return companies.find((company) => company.id === companyId)
}

export interface FetchBugReportsParams {
  serviceId: string
  cursor?: number
  limit?: number
}

export async function fetchBugReports({ serviceId, cursor = 0, limit = 4 }: FetchBugReportsParams) {
  initializeReports()
  await delay(300)
  const filtered = bugReportsStore.filter((report) => report.serviceId === serviceId)
  const { data, nextCursor } = paginate(filtered, cursor, limit)
  return { data, nextCursor }
}

export interface SubmitBugReportParams {
  serviceId: string
  title: string
  description: string
  deviceInfo: BugReport['deviceInfo']
  attachments?: string[]
}

export async function submitBugReport(payload: SubmitBugReportParams) {
  await delay(400)
  const newReport: BugReport = {
    id: `bug-${payload.serviceId}-${Date.now()}`,
    serviceId: payload.serviceId,
    title: payload.title,
    description: payload.description,
    deviceInfo: payload.deviceInfo,
    attachments: payload.attachments ?? [],
    createdAt: new Date().toISOString(),
    endorsements: 0,
  }
  bugReportsStore = [newReport, ...bugReportsStore]
  return newReport
}

export async function endorseBugReport(reportId: string) {
  await delay(200)
  bugReportsStore = bugReportsStore.map((report) => (report.id === reportId ? { ...report, endorsements: report.endorsements + 1 } : report))
  return bugReportsStore.find((report) => report.id === reportId)
}
