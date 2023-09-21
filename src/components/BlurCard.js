import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import ArrowRight from '../assets/icons/arrowRigth.svg';


export default function BlurCard( props ) {
  const navigation = useNavigation()
  const { text, indicador, nextNavigation,txtBtn } = props;
  return (
    <BlurView intensity={100} tint="light" style={styles.blurContainer}>
      <View style={styles.containerIndicadores}>
        <View style={[styles.indicador, indicador == 1 && styles.indicadorSelected]}></View>
        <View style={[styles.indicador, indicador == 2 && styles.indicadorSelected]}></View>
        <View style={[styles.indicador, indicador == 3 && styles.indicadorSelected]}></View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.txtTitle}>CLEAN HOME</Text>
        <Text style={styles.txt}>{text}</Text>
      </View>
      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate(nextNavigation)}>
          <Text style={styles.txtNext}>{txtBtn}</Text>
          <ArrowRight width={32} fill={"#000"}/>
        </TouchableOpacity>
        
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: '90%',
    height: 200,
    borderRadius: 30,
    padding: 20,
    },
    containerIndicadores: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    indicador: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#BBB',
        marginHorizontal: 10,
    },
    indicadorSelected: {
        backgroundColor: '#075493',
        
    },
    containerText: {
        alignItems: 'center',
        marginBottom: 15,        
    },
    txtTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#02192C',
        marginBottom: 5,
        letterSpacing: 4,
    },
    txt: {
        fontSize: 16,
        color: '#02192C',
        letterSpacing: 1,
    },
    containerBtn: {
      width: '100%',
    },
    btnPrimary: {
      width: '100%',
      height: 50,
      backgroundColor: '#075493',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      alignContent: 'center',
      textAlign: 'center',
    },
    txtNext: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 2,
      marginRight: 10,

    }
})
