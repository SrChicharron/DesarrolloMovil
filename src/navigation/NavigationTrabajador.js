import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/trabajador/Home'
import {createStackNavigator} from '@react-navigation/stack'
import DetalleHome from '../components/DetalleHome';
import Postulaciones from '../screens/trabajador/Postulaciones';


export default function NavigationTrabajador() {

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
    <Stack.Screen 
      name='DetalleHome' 
      component={DetalleHome}
      options={{
        title: '',
        headerTransparent: true
      }}
      />
     
    </Stack.Navigator>
  )
}