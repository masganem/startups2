import { create } from 'zustand'
import type { DeviceInfo, Service } from '../types/data'

interface UIState {
  selectedService: Service | null
  deviceInfo: DeviceInfo | null
  setSelectedService: (service: Service | null) => void
  setDeviceInfo: (device: DeviceInfo) => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedService: null,
  deviceInfo: null,
  setSelectedService: (service) => set({ selectedService: service }),
  setDeviceInfo: (device) => set({ deviceInfo: device }),
}))
