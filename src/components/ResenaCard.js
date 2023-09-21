import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import ProfileImg from '../assets/images/welcome1.jpg'

export default function ResenaCard() {
    return (
        <View style={styles.container}>

            <View style={styles.viewHeader}>
                <Image source={ProfileImg} style={styles.imgUser} />
                <View style={styles.viewInfo}>
                    <Text style={styles.textName}>Karina Yiv</Text>
                    <Text style={{ color: '#707070' }}>Hace 2 semanas</Text>
                </View>
            </View>

            <View style={styles.viewFooter}>
                <Text numberOfLines={9} style={styles.textResena}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 180,
        backgroundColor: '#FFF',
        margin: 10,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        elevation: 5, // Esto agregará la sombra en Android
        shadowColor: '#000', // Esto agregará la sombra en iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    viewHeader: {
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        marginBottom: 8
    },
    viewFooter: {
        width: '100%',
        height: '60%',
    },
    viewInfo: {
        alignContent: 'center',
        alignSelf: 'center',

    },
    imgUser: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginRight: 16,
        
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textResena: {
        fontSize: 12,
        fontStyle: 'italic'
    }

})