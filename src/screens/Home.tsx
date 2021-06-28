import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { IDevice } from '../types'
import { manager } from '../lib'
import DeviceListItem from '../components/DeviceListItem'

const initialDevices: IDevice[] = [
  {
    id: 'uuid1',
    name: '会議室1',
    isUnlock: false,
    deviceClient: null,
  },
  {
    id: 'uuid2',
    name: 'B棟倉庫',
    isUnlock: true,
    deviceClient: null,
  },
]

export default function Home() {
  // 実際には API からデバイス一覧を取得
  const [devices, setDevices] = useState(initialDevices)

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      const isMyDevice = devices.some(d => d.name === device.name)
      if (isMyDevice) {
        const newDevices = devices.map(d => {
          if (d.name === device.name) {
            return {
              ...d,
              deviceClient: device,
            }
          }
        })
        setDevices(newDevices)

        // Stop scanning as it's not necessary if you are scanning for one device.
        // manager.stopDeviceScan();

        // 接続は詳細ページで
        // Proceed with connection.
        // device.connect()
        //   .then((device) => {
        //     return device.discoverAllServicesAndCharacteristics()
        //   })
        //   .then((device) => {
        //     // Do work on device with services and characteristics
        //   })
        //   .catch((error) => {
        //     // Handle errors
        //   });
      }
    });
  }

  useEffect(() => {
    // TODO: 初期化時にデバイスリストを取得
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          // TODO: ライブラリの実装によっては3秒に1回再スキャンとかしてもよさそう
          scanAndConnect();
          subscription.remove();
        }
      }, true);
      return () => subscription.remove();
    });
  }, [])

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
  scrollViewContentContainer: {
    // minHeight: '100%',
  },
})
