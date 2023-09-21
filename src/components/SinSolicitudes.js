import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import EscobaClean from '../assets/icons/escobaClean.svg'

export default function SinSolicitudes(props) {
    const {mensajeTitulo, mensajeDescripcion, txtBtn, onPressBtn}= props

  return (
    <View style={styles.container}>
      <EscobaClean height={80}/>
      <Text style={styles.textTitle}>{mensajeTitulo}</Text>
      <Text style={styles.textDescription}>{mensajeDescripcion}</Text>
      <TouchableOpacity style={styles.containerBtn} onPress={onPressBtn}>
        <Text style={styles.txtBtn}>{txtBtn}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: '99%',
        margin: 2,
        marginBottom: 8,
        height:250,
        backgroundColor:'#FFF',
        paddingHorizontal:16,
        paddingVertical:16,
        borderRadius: 10,
        elevation: 5, // Esto agregará la sombra en Android
        shadowColor: '#000', // Esto agregará la sombra en iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent:"center",
        alignItems:'center'
    },
    textTitle:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    textDescription:{
        fontSize:16,
        color:'gray',
        textAlign:'center'
    },
    containerBtn: {
      backgroundColor: '#075493',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 16,
      width: '100%',
      alignItems: 'center',
    },
    txtBtn: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
})