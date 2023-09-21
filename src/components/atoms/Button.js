import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Button( props ) {
    const { txtBtn, onPress } = props;
  return (
    <>
        <TouchableOpacity style={styles.btnPrimary} onPress={onPress}>
            <Text style={styles.loginButtonText}>{txtBtn}</Text>
        </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: '#075493',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})