import type { DeviceInfo } from '../types/data'

const fallback: DeviceInfo = {
  os: 'Unknown OS',
  browser: 'Browser',
  version: '0.0.1',
  locale: 'en-US',
}

export function deriveDeviceInfo(): DeviceInfo {
  if (typeof navigator === 'undefined') {
    return fallback
  }

  const ua = navigator.userAgent
  const os = ua.includes('Win') ? 'Windows 11' : ua.includes('Mac') ? 'macOS 14' : ua.includes('Android') ? 'Android 14' : 'iOS 17'
  const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Safari') ? 'Safari' : 'Browser'

  return {
    os,
    browser,
    version: '1.0.0',
    locale: navigator.language ?? fallback.locale,
  }
}
