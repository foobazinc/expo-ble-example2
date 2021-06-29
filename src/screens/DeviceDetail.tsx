import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Characteristic, Device } from 'react-native-ble-plx'
import { Buffer } from 'buffer'
import { IDevice } from '../types'
import { manager } from '../lib'

type Props = {
  device: IDevice
}

export default function DeviceDetail({ device }: Props) {
  const [peripheral, setPeripheral] = useState<Device>(null)

  // 施錠・解錠用の Characteristic を取得する
  const findLockOperationCharacteristic = (characteristics: Characteristic[]): Characteristic => {
    const characteristic = characteristics.find(c => {
      return c.uuid === device.characteristicUuid.toLowerCase()
    })
    if (!characteristic) {
      // Characteristic が見つからない場合
      throw new Error('Characteristic が見つかりません')
    }
    return characteristic
  }

  // ボタンクリック時の施錠・解錠リクエストのシミュレーション
  const onPress = async () => {
    try {
      await peripheral?.connect()
      await peripheral.discoverAllServicesAndCharacteristics()
      const characteristics = await peripheral.characteristicsForService(device.id)
      const characteristic = findLockOperationCharacteristic(characteristics)
      // 検証用なので 'Hello' を送信
      const dataToWrite = Buffer.from('Hello').toString('base64')
      await characteristic.writeWithResponse(dataToWrite)
    } catch (e) {
      console.error(e)
    }
  }

  const scan = () => {
    manager.startDeviceScan([device.id], null, (error, peripheral) => {
      if (error) {
        console.error(error)
        return
      }

      setPeripheral(peripheral)
    })
  }

  useEffect(() => {
    setPeripheral(device.deviceClient)
    scan()
  }, [manager])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {device.name}
        </Text>
        <Text style={styles.status}>
          RSSI: {peripheral?.rssi ? `${peripheral?.rssi}dBm` : '未検出'}
        </Text>
      </View>
      <View style={styles.body}>
        <Button
          title="タップして施錠"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={onPress}
        />
        <Text style={styles.notes}>
          ドアが開いています
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#999',
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
  buttonContainer: {
    marginBottom: 14,
    borderRadius: 100,
  },
  button: {
    paddingVertical: 12,
  },
  notes: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999',
  },
})
