import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Welcome from '../../assets/images/welcome2.jpg'
import BlurCard from '../../components/BlurCard';
import ArrowRight from '../../assets/icons/arrowRightSolid.svg'

export default function Welcome2() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Image source={Welcome} style={styles.imgBack}/>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.txtNext}>Omitir intro</Text>
                <ArrowRight width={24} height={24} fill={"#fff"}/>
            </TouchableOpacity>
            <View style={styles.containerBlur}>
                <BlurCard text={"Tu aliado para una casa impecable"} indicador={2} nextNavigation={"Welcome3"} txtBtn={"Siguiente"}/>
            </View>
        </SafeAreaView>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        imgBack: {
            width: '100%',
            height: '110%',
            resizeMode: 'cover',
            marginTop: -50,
        },
        btn: {
            position: 'absolute',
            right: 20,
            top: 70,
            flexDirection: 'row',
            alignItems: 'center',

        },
        txtNext: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        containerBlur: {
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }
    })