import { View, Text,Modal, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useAuth from '../hooks/UseAuth';
import Toast from 'react-native-toast-message'
import axios from 'axios';

export default function AccionesSolicitudes(props) {
    const {auth,logout} = useAuth()
    const token=auth.token;
    //Usar toggleModal para cerrar el modal
    const {isModalVisible, toggleModal, id, name, getSolicitudes} = props;
    const showToastSuccess = () =>{
        Toast.show({
            type:"success",
            text1:'Solicitud aceptada!',
            text2:`Has aprobado la solicitud de ${name}`
        })
    }

    const showToastError = () =>{
        Toast.show({
            type:"error",
            text1:'Solicitud rechazada!',
            text2:`Has rechazado la solicitud de ${name}`
        })
    }

    const showToastWarning = () =>{
        Toast.show({
            type:"error",
            text1:'Error!',
            text2:`Ocurrio un problema con las solicitudes.`
        })
    }

    const aceptarSolicitud = () => {
        console.log('aceptando solicitud con id: '+ id + name)
        const urlupdateEstatusPos=`http://clenhometm.trafficmanager.net:2813/ch/postulacion/editarEstatusPostulacion?id=${id}`
        axios({
          method: "POST",
          url: urlupdateEstatusPos,
          data: {estatus:"aceptada"},
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
          },
        }).then(response => {
            if(response.status==200){
                showToastSuccess()
                toggleModal()
                getSolicitudes()
            }
          
        }).catch(error => {
            showToastWarning()
          console.log(error);
        })
      };

      const rechazarSolicitud = () => {
        console.log('rechazando solicitud con id: '+id)
        const urlupdateEstatusPos=`http://clenhometm.trafficmanager.net:2813/ch/postulacion/editarEstatusPostulacion?id=${id}`
        axios({
          method: "POST",
          url: urlupdateEstatusPos,
          data: {estatus:"rechazada"},
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
          }
        }).then(response => {
            if(response.status==200){
                showToastError()
                toggleModal()
            }
          
        }).catch(error => {
            showToastWarning()
          console.log(error);
        })
      };
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={ styles.closeButton } onPress={toggleModal}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={styles.iconClose}
                        size={24}
                /></TouchableOpacity>

                <TouchableOpacity onPress={aceptarSolicitud} style={{...styles.buttonAceptar, ...styles.btn}}>
                    <Text style={styles.textButtons}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={rechazarSolicitud} style={{...styles.buttonRechazar, ...styles.btn}}>
                    <Text style={styles.textButtons}>Rechazar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 10,
        alignItems: 'center',
        width:'80%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 8,
        right: 8,
    },
    iconClose: {
        color: '#075493',
    },
    btn: {
        width:'100%',
        borderRadius:5,
        paddingVertical: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonAceptar:{
        backgroundColor:'#075493',
        marginBottom: 16,
    },
    buttonRechazar:{
        backgroundColor:'#F44336',
    },
    textButtons: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 2,
        fontWeight: 'bold',
    }
})