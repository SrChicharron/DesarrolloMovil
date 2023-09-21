import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Home from '../screens/cliente/Home'

export default function NavigationCliente() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name='CuentaCliente' 
      component={Home}
      options={{
        title: '',
        headerTransparent: true
      }}
      />
    </Stack.Navigator>
  )
}