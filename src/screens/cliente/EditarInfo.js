import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import ProfileImg from '../../assets/images/welcome1.jpg'
import ButtonGuardar from '../../components/atoms/Button' 

export default function EditarInfo() {
  return (
    <SafeAreaView style={styles.mainContainer}>

      <View style={styles.viewCardCuenta}>
        <Image source={ProfileImg} style={styles.profileImg}/>
        <TouchableOpacity style={styles.buttonEditImg}>
        <Text style={styles.textButton}>Editar</Text>
        </TouchableOpacity>

        <Text style={styles.textName}>Nombre Apellido</Text>
        <Text>Rol (Trabajador/Cliente)</Text>
      </View>

      <ScrollView>
      <Text style={styles.textInfo}>Información de Nombre</Text>
      <TextInput
          style={styles.inputInfoCliente}
          placeholder="Informacion del cliente"
          secureTextEntry
          multiline={true}
      />

      <View style={styles.viewIconData}>
        <FontAwesome name="user-o" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          secureTextEntry
          multiline={true}
      />
      </View>
     

      <View style={styles.viewIconData}>
        <FontAwesome name="envelope-o" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Correo electronico"
          secureTextEntry
          multiline={true}
          keyboardType='email-address'
      />
      </View>
     

      <View style={styles.viewIconData}>
        <FontAwesome name="phone" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          secureTextEntry
          multiline={true}
          keyboardType='phone-pad'
      />
      </View>
     

      <View style={styles.viewIconData}>
        <FontAwesome name="birthday-cake" size={24} color="gray" />
        <Text style={styles.textInfoDescription2}>xx años</Text>
      </View>
      

      <View style={styles.viewIconData}>
        <Foundation name="male-symbol" size={34} color="gray" />
        <Text style={styles.textInfoDescription2}>sexo</Text>
      </View>
      </ScrollView>

      <ButtonGuardar txtBtn="Guardar"/>
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  viewCardCuenta:{
    marginTop:15,
    alignSelf:'center',
    width:'90%',
    backgroundColor: '#fff', 
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
  profileImg:{
    width:150,
    height:150,
    borderRadius:100,
    marginTop:-20
  },
  buttonEditImg:{
    bottom:15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:'15%',
    width:'30%',
    elevation: 5, // Esto agregará la sombra en Android
    shadowColor: '#000', // Esto agregará la sombra en iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textButton:{
    fontSize:16,
    color:'#000'
  },
  textName:{
    fontSize:25,
    fontWeight:'bold'
  },
  textInfo:{
    fontSize:18,
    margin:10,
    fontWeight:'bold'
  },
  textInfoDescription:{
    fontSize:15,
    margin:10,
    textAlign:'justify'
  },
  textInfoDescription2:{
    fontSize:17,
    margin:5,
    textAlign:'left',
    color:'gray',
    marginLeft:10
  },
  viewIconData:{
    flexDirection:'row',
    margin:5,
    alignContent:'center',
    alignItems:'center',
  },
  input: {
    // Background con trasparencia
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "90%",
    marginLeft:5
  },
  inputInfoCliente: {
    // Background con trasparencia
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "97%",
    height:"20%",
    marginLeft:5,
    marginRight:5
  },
})