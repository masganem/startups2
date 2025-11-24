import type { BugReport, Company } from '../types/data'
import { companies } from '../data/mockData'
import { delay, paginate } from '../utils/async'

let bugReportsStore: BugReport[] = []

const osList = ['Android 14', 'Android 13', 'iOS 17.4', 'iOS 16.2', 'Windows 11', 'macOS 14.1']
const browserList = ['Chrome', 'Safari', 'Firefox', 'Edge']
const randomFrom = <T,>(array: T[]) => array[Math.floor(Math.random() * array.length)]

const initializeReports = () => {
  if (bugReportsStore.length === 0) {
    const issueTemplates = [
      {
        title: (serviceName: string) => `${serviceName} fecha sozinho no Android 14`,
        description: 'App encerra após login rápido no Pixel 6; começa quando notificações chegam.',
      },
      {
        title: (serviceName: string) => `${serviceName} não salva alterações offline`,
        description: 'Usuário edita dados sem conexão e, ao reconectar, nada sincroniza.',
      },
      {
        title: (serviceName: string) => `${serviceName} fica preso carregando no Safari`,
        description: 'Spinner infinito ao abrir painel em iOS 17.4, console mostra erro de CORS.',
      },
      {
        title: (serviceName: string) => `${serviceName} duplica alertas push`,
        description: 'Cada evento gera 2 notificações; endpoint envia apenas um payload.',
      },
      {
        title: (serviceName: string) => `${serviceName} não renderiza gráficos no tablet`,
        description: 'Charts desaparecem em largura >1024px; suspeita de overflow no container.',
      },
      {
        title: (serviceName: string) => `${serviceName} trava ao filtrar por data`,
        description: 'Filtro de datas retorna 500 na API e interface fica congelada.',
      },
      {
        title: (serviceName: string) => `${serviceName} falha no fluxo de OAuth`,
        description: 'Após aprovação, redireciona para /error; refresh token não é criado.',
      },
      {
        title: (serviceName: string) => `${serviceName} não anexa arquivos grandes`,
        description: 'Uploads acima de 20MB ficam em 0% e nunca retornam erro para o usuário.',
      },
    ]

    const allReports: BugReport[] = []

    companies.forEach((company) => {
      company.services.forEach((service) => {
        issueTemplates.forEach((template, templateIndex) => {
          allReports.push({
            id: `bug-${service.id}-${templateIndex}`,
            serviceId: service.id,
            title: template.title(service.name),
            description: template.description,
            attachments: [],
            deviceInfo: {
              os: randomFrom(osList),
              browser: randomFrom(browserList),
              version: '1.0',
              locale: 'en-US',
            },
            createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 730).toISOString(),
            endorsements: templateIndex % 5,
          })
        })
      })
    })

    bugReportsStore = allReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

export interface FetchCompaniesParams {
  cursor?: number
  limit?: number
  searchTerm?: string
}

export async function fetchCompanies({ cursor = 0, limit = 6, searchTerm = '' }: FetchCompaniesParams) {
  initializeReports()
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
  cursor?: number
  limit?: number
}

export async function fetchBugReports({ cursor = 0, limit = 4 }: FetchBugReportsParams) {
  initializeReports()
  await delay(300)
  const { data, nextCursor } = paginate(bugReportsStore, cursor, limit)
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
