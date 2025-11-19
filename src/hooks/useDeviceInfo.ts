import { useCallback, useEffect, useState } from 'react'
import { deriveDeviceInfo } from '../utils/device'
import type { DeviceInfo } from '../types/data'

export function useDeviceInfo() {
  const [device, setDevice] = useState<DeviceInfo>(() => deriveDeviceInfo())

  const refresh = useCallback(() => {
    setDevice(deriveDeviceInfo())
  }, [])

  useEffect(() => {
    setDevice(deriveDeviceInfo())
  }, [])

  return { device, refresh }
}
