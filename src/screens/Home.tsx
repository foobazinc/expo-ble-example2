import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { IDevice } from '../types'
import { manager } from '../lib'
import DeviceListItem from '../components/DeviceListItem'

const initialDevices: IDevice[] = [
  {
    id: '4ffe62bc-bac2-3703-be4c-e03fb2eca028',
    name: '会議室1',
    isUnlock: false,
    deviceClient: null,
    characteristicUuid: 'd2ccfe02-463f-9980-5f41-65c267515c37',
  },
  {
    id: '76c53cea-e2ac-b88e-bd56-c51a3876b156',
    name: 'B棟倉庫',
    isUnlock: true,
    deviceClient: null,
    characteristicUuid: 'd2ccfe02-463f-9980-5f41-65c267515c37',
  },
  {
    id: 'e54b3f6e-5354-3912-9899-2e0daa6bc88d',
    name: 'yudai524-mbp13',
    isUnlock: true,
    deviceClient: null,
    characteristicUuid: 'd2ccfe02-463f-9980-5f41-65c267515c37',
  },
]

export default function Home() {
  // 実際には API からデバイス一覧を取得するが、検証用なのでハードコードしたものを渡す
  const [devices, setDevices] = useState(initialDevices)
  const uuids = initialDevices.map(d => d.id)

  // 周辺のデバイスをスキャンして、API から取得したデバイスと合致するものがあれば情報を state に格納
  const scan = () => {
    manager.startDeviceScan(uuids, null, (error, device) => {
      if (error) {
        console.error(error)
        return
      }

      const isMyDevice = devices.some(d => d.name === device.name)
      if (isMyDevice) {
        const newDevices = devices.map(d => {
          if (d.name === device.name) {
            return {
              ...d,
              deviceClient: device,
            }
          }

          return d
        })
        setDevices(newDevices)
      }
    })
  }

  useEffect(() => {
    scan()
  }, [manager])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {devices.map((d) => (
          <DeviceListItem key={d.id} device={d} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollViewContentContainer: {},
})
