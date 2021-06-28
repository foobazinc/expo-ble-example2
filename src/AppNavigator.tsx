import React from 'react'
import { StyleSheet } from 'react-native'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Device from './screens/Device'
import Home from './screens/Home'

export default function AppNavigator() {
  return (
    <Router>
      <Stack key='home'>
        <Scene
          key='deviceList'
          component={Home}
          title='ドア一覧'
        />
        <Scene
          key='deviceDetail'
          component={Device}
          title='ドア詳細'
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
