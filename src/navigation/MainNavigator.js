import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from '../hooks/UseAuth';
import BottomNavigation from './BottomNavigation';
import NavigationIntro from './NavigationIntro';

export function MainNavigator() {
  const {auth} = useAuth()
  return (
    <NavigationContainer>
      {auth ? <BottomNavigation userRole={auth.rol}/> : <NavigationIntro />}
    </NavigationContainer>
  );
}