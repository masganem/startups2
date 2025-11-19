export const QUERY_KEYS = {
  companies: 'companies',
  company: (companyId: string) => ['company', companyId] as const,
  serviceBugReports: (serviceId: string) => ['bugReports', serviceId] as const,
}
