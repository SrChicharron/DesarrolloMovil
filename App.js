import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { MainNavigator } from './src/navigation/MainNavigator';

export default function App() {
  return (
    <SafeAreaProvider >
        <AuthProvider>
          <MainNavigator/>
        </AuthProvider>
    </SafeAreaProvider>
  );
}
