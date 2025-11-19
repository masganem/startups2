export interface DeviceInfo {
  os: string
  browser: string
  version: string
  locale: string
}

export interface BugReport {
  id: string
  serviceId: string
  title: string
  description: string
  attachments?: string[]
  deviceInfo: DeviceInfo
  createdAt: string
  endorsements: number
}

export interface Service {
  id: string
  name: string
}

export interface Company {
  id: string
  name: string
  logo: string
  totalBounties: number
  lastMonthBounties: number
  totalReports: number
  lastMonthReports: number
  services: Service[]
}

export interface User {
  id: string
  name: string
  avatar: string
}
