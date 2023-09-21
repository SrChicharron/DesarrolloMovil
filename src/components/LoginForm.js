import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/logo/isotipo.svg';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm( props ) {
    

    const navigation = useNavigation();
    const { email, setEmail, password, setPassword, handleLogin } = props;
  return (
    <>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button txtBtn="Iniciar sesión" onPress={handleLogin} />

      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLinkText}>¿No tienes cuenta? <Text style={{ color: '#075493' }}>Regístrate</Text></Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    // Background con trasparencia
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 20,
  },
  registerLinkText: {
    color: '#6E6E6E',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
