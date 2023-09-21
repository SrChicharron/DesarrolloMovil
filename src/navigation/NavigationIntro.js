import { View, Text, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../screens/introduction/Welcome'
import Welcome2 from '../screens/introduction/Welcome2'
import Welcome3 from '../screens/introduction/Welcome3'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import ArrowRigth from '../assets/icons/arrowLeftLogin.svg'

export default function NavigationIntro() {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{ 
          headerShown: false,
          
      }}/>
      <Stack.Screen 
        name="Welcome2" 
        component={Welcome2} 
        options={{ 
          headerShown: false,
          
      }}/>
      <Stack.Screen 
        name="Welcome3" 
        component={Welcome3} 
        options={{ 
          headerShown: false,
          
      }}/>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ 
          headerShown: false,
          
      }}/>
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{
          title:'Crea tu cuenta', 
          headerTransparent: true,
          headerTitleStyle: {
            color: '#075493',
            fontSize: 24,
            marginLeft: 50,
            fontWeight: 'bold',
          },
          headerBackImage: () => (
            <ArrowRigth
              width={24}
              height={24}
              style={{marginLeft: 8}}
            />
          ), 
      }}/>
    </Stack.Navigator>
  )
}