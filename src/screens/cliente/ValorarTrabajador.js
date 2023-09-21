import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import React,{useState} from 'react'
import ProfileImg from '../../assets/images/welcome1.jpg'
import { AntDesign } from '@expo/vector-icons';

export default function ValorarTrabajador(props) {
    //PONER ESTE CODIGO EN LA PANTALLA DONDE DEDBERA ABRIR EL MODAL
    // const [isModalVisible, setModalVisible] = useState(false);
  
    // const toggleModal = () => {
    //   setModalVisible(!isModalVisible);
    // };
  
     const {toggleModal, isModalVisible} = props;
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textHeader}>Deja una reseña y da por finalizado el trabajo</Text>

            <View style={styles.viewCardCuenta}>
              <Image source={ProfileImg} style={styles.profileImg}/>

              <Text style={styles.textName}>Nombre Apellido</Text>
              <Text>Rol (Trabajador/Cliente)</Text>
            </View>

            <View style={styles.viewStars}>
                <AntDesign name="staro" size={45} color="#FFC300" />
                <AntDesign name="staro" size={45} color="#FFC300" />
                <AntDesign name="staro" size={45} color="#FFC300" />
                <AntDesign name="staro" size={45} color="#FFC300" />
                <AntDesign name="staro" size={45} color="#FFC300" />
            </View>

            <TextInput
            multiline={true}
            placeholder='Escribe una reseña (Opcional)'
            style={styles.inputResena}
            />

            <View style={styles.viewButtons}>

            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.textCancelarButton}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.enviarButton}>
              <Text style={styles.textEnviarButton}>Enviar y finalizar</Text>
            </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  modalContainer: {
    flex:3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    alignItems: 'center',
    width:'100%',
    height:'70%',
  },
  textHeader:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  viewCardCuenta:{
    alignSelf:'center',
    width:'100%',
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
    width:110,
    height:110,
    borderRadius:100,
  },
  textName:{
    fontSize:25,
    fontWeight:'bold'
  },
  viewStars:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:5
  },
  inputResena: {
    // Background con trasparencia
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    borderRadius: 10,
    padding: 10,
    marginTop:5,
    marginBottom: 10,
    width: "100%",
    height:"25%",
  },
  viewButtons:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    height:'10%'
  },
  cancelButton:{
    backgroundColor:'#E73C3C',
    width:'45%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },
  enviarButton:{
    backgroundColor:'#075493',
    width:'45%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },
  textCancelarButton:{
    color:'#FFF',
    fontSize:16,
    textAlign:'center'
  },
  textEnviarButton:{
    color:'#FFF',
    fontSize:16,
    textAlign:'center'
  },
})