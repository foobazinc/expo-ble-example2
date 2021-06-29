import { Device } from 'react-native-ble-plx'

export interface IDevice {
  id: string
  name: string
  isUnlock: boolean
  deviceClient: Device | null
  characteristicUuid: string
}