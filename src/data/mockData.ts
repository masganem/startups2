import type { Company, Service, User } from '../types/data'

const serviceNames = [
  'Payments',
  'Auth',
  'Dashboard',
  'Insights',
  'Notifications',
  'Billing',
  'Onboarding',
  'Analytics',
  'Search',
  'Storage',
  'Gateway',
]
const companyNames = ['NovaSPIRE', 'AtlasWave', 'LumenCore', 'EchoNexus', 'PulsePoint', 'AstraForge']
const locales = ['en-US', 'pt-BR', 'es-ES', 'fr-FR']

const user: User = {
  id: 'user-1',
  name: 'Aria Reyes',
  avatar: 'AR',
}

function randomFrom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateServices(companyId: number): Service[] {
  const serviceCount = Math.min(serviceNames.length, 3 + (companyId % 4))
  const rotatedNames = [...serviceNames.slice(companyId), ...serviceNames.slice(0, companyId)]

  return rotatedNames.slice(0, serviceCount).map((name, index) => ({
    id: `service-${companyId}-${index}`,
    name,
  }))
}

const companies: Company[] = companyNames.map((name, index) => {
  const services = generateServices(index)
  const totalReports = services.length * 8
  const lastMonthReports = Math.max(2, Math.floor(totalReports * 0.3))

  return {
    id: `company-${index}`,
    name,
    logo: name.charAt(0),
    totalBounties: 50000 + index * 12000,
    lastMonthBounties: 1500 + index * 600,
    totalReports,
    lastMonthReports,
    services,
  }
})

export { user, companies }
