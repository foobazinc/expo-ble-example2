import React from 'react'
import { StyleSheet } from 'react-native'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Home from './screens/Home'
import DeviceDetail from './screens/DeviceDetail'

export default function AppNavigator() {
  return (
    <Router>
      <Stack key='home'>
        <Scene
          key='deviceList'
          component={Home}
          title='デバイス一覧'
        />
        <Scene
          key='deviceDetail'
          component={DeviceDetail}
          title='デバイス詳細'
          back={true}
        />
      </Stack>
    </Router>
  )
}

const styles = StyleSheet.create({
  navBar: {
    borderBottomWidth: 1,
  },
  navBarTitle: {},
})
