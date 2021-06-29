import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { IDevice } from '../types'
import { Actions } from 'react-native-router-flux'

type Props = {
  device: IDevice
}

export default function DeviceListItem({ device }: Props) {
  const onPress = () => {
    Actions.deviceDetail({ device })
  }
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title style={styles.name}>{device.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.status}>
          RSSI: {device.deviceClient?.rssi ? `${device.deviceClient?.rssi}dBm` : '未検出'}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999',
  },
})
