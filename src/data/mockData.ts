import type { Company, Service, User } from '../types/data'

const serviceNames = ['Payments', 'Auth', 'Dashboard', 'Insights', 'Notifications', 'Billing']
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
  const serviceCount = 2 + (companyId % 3)
  return Array.from({ length: serviceCount }, (_, index) => ({
    id: `service-${companyId}-${index}`,
    name: serviceNames[(companyId + index) % serviceNames.length],
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
