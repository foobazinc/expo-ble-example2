import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { IDevice } from '../types'
import DeviceListItem from '../components/DeviceListItem'

export default function Home() {
  const initialDevices: IDevice[] = []
  const [devices, setDevices] = useState(initialDevices)

  useEffect(() => {
    // TODO: 初期化時にデバイスリストを取得
    setDevices([
      {
        name: '会議室1',
        uuid: 'uuid1',
      },
      {
        name: 'B棟倉庫',
        uuid: 'uuid2',
      },
    ])
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {devices.map((d) => (
          <DeviceListItem key={d.uuid} device={d} />
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
