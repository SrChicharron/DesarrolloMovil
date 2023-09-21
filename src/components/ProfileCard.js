import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from "react";
import VerificateIcon from '../assets/icons/VerificateIcon.svg'
import AvatarH from "../assets/images/AvatarH.png";
import useAuth from "../hooks/UseAuth";

export default function ProfileCard( props ) {
    const { formData, handleChange, infoUser } = props; 
    const { auth } = useAuth();
console.log("Esto es lo que llega a Profile card : === > " + JSON.stringify(infoUser, null , 4))

  return (
    <View style={styles.container}>
        <View style={styles.containerImage}>
            <Image source={AvatarH} style={styles.profileImg}/>
            <VerificateIcon height={30} width={30} style={styles.iconVerif}/>
        </View>
        <Text style={styles.txtName}>{auth.email} {infoUser.lastname}</Text>
        <Text style={styles.txtRol}>{auth.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '99%',
        height: 270,
        elevation: 5, // Esto agregará la sombra en Android
        shadowColor: '#000', // Esto agregará la sombra en iOS
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    profileImg: {
        width: 154,
        height: 180,
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 170,
        marginVertical: 14,
    },
    iconVerif: {
        position: 'absolute',
        top: 5,
        right: 0,
    },
    txtName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 8,
    },
    txtRol: {
        fontSize: 16,
    }
})