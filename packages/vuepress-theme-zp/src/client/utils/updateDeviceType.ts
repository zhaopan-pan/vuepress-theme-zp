import { onMounted } from 'vue'
import cssVariables from '../styles/_variables.module.scss'

export enum DeviceType {
  MOBILE = 1,
}

const DeviceTypeMap = {
  [DeviceType.MOBILE]: Number(cssVariables.MQMobile?.replace('px', '')),
}

/**
 * add listener to detect screen
 */
export const updateDeviceType = (
  deviceType: DeviceType,
  callback: (w: number) => void
) => {
  onMounted(() => {
    const width = DeviceTypeMap[deviceType]
    if (!width) return

    callback(width)

    window.addEventListener('resize', () => callback(width), false)
    window.addEventListener('orientationchange', () => callback(width), false)
  })
}
