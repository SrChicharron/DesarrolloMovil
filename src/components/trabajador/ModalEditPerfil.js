import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, Button } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import EditProfileForm from "./EditProfileForm";
import axios from "axios";
import Toast from 'react-native-toast-message'
import useAuth from "../../hooks/UseAuth";

export default function ModalEditPerfil(props) {
    const { auth, logout } = useAuth();
    const { modalVisible, closeModal, userData, handleChange, infoUser, editUsuario } = props;
    const token=auth.token;
    const showToastSucces = () =>{
        Toast.show({
            type:"success",
            text1:'Informacion actualizada!',
            text2:'Tu informacion se ha actualizado correctamente'
        })
    }

    const showToastError = () =>{
        Toast.show({
            type:"error",
            text1:'Error!',
            text2:'Ocurrio un problema al actualizar tu informacion'
        })
    }
    
    const actualizarInfo = () => {
        const urlupdateInfo=`http://clenhometm.trafficmanager.net:2813/ch/auth/editarInfoUser/${auth.username}`
        axios({
          method: "PUT",
          url: urlupdateInfo,
          data: JSON.stringify(formData),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
          },
        }).then(response => {
            if(response.status==200){
                closeModal();
                showToastSucces()
            }
          
        }).catch(error => {
            showToastError()
          console.log(error);
        })
      };
    
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer} >
                <View style={styles.containerForm}>
                    <View style={styles.headerModal}>
                        <Text style={styles.titleModal}>Editar perfil</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={styles.iconClose}
                            size={24}
                        />
                    </TouchableOpacity>
                    <KeyboardAwareScrollView style={styles.bodyModal}>
                        {/* Formulario para crear una nueva publicación */}
                        <EditProfileForm userData={userData} infoUser={infoUser} handleChange={handleChange} />
                    </KeyboardAwareScrollView>
                    <View style={styles.footerModal}>
                        {/* Botones para publicar y cancelar */}
                        <TouchableOpacity style={{ ...styles.btnCancelar, ...styles.btn }} onPress={closeModal} >
                            <Text style={styles.txtBtn}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnPublicar, ...styles.btn }} onPress={editUsuario}>
                            <Text style={styles.txtBtn}>Editar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm: {
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    iconClose: {
        alignSelf: 'flex-end',
        marginRight: 16,
        marginTop: 16,
        color: '#075493',

    },
    headerModal: {
        paddingVertical: 16,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
    },
    titleModal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    bodyModal: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 80,
    },
    footerModal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
    },
    btn: {
        width: '45%',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnCancelar: {
        backgroundColor: '#EA5455',
    },
    btnPublicar: {
        backgroundColor: '#075493',
    },
    txtBtn: {
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
