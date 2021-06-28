import React from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigator from './AppNavigator'

export default function AppRoot() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <AppNavigator />
    </View>
  )
}
