import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { IDevice } from '../types'

type Props = {
  device: IDevice
}

export default function Device({ device }: Props) {
  const onPress = () => {
    console.log(device.name)
    // TODO: デバイスとの通信処理を実装
    device.deviceClient?.connect()
      .then((deviceClient) => {
        return deviceClient.discoverAllServicesAndCharacteristics()
      })
      .then((deviceClient) => {
        // Do work on device with services and characteristics
      })
      .catch((error) => {
        // Handle errors
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {device.name}
        </Text>
        <Text style={styles.status}>
          {device.isUnlock ? '解錠中' : '施錠中'}
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
