import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import CuentaCliente from '../screens/cliente/Cuenta'
import EditarInfo from '../screens/cliente/EditarInfo'

export default function NavigationCuentaCliente() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name='CuentaCliente' 
      component={CuentaCliente}
      options={{
        title: '',
        headerTransparent: true
      }}
      />
      <Stack.Screen 
      name='EditarInfo' 
      component={EditarInfo}
      options={{
        title: '',
        headerTransparent: true
      }}
      />
    </Stack.Navigator>
  )
}