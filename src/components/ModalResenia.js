import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReseniaForm from "./ReseniaForm";

export default function ModalResenia( props ) {
    const { modalVisible, closeModal, publicacion, handleChange, resenia, onAddResenia } = props;

        // Se crea objeto para mandar reseña
        // const resenia = {
        //     publicacion: {
        //         id: publicaciones.id,
        //     },
        //     evaluado: {
        //         id: publicaciones.usuario.id,
        //     },
        //     evaluador: {
        //         id: publicaciones.propiedad.idUsuario,
        //     },
        //     calificacion: reseniaData.calificacion,
        //     comentarios: reseniaData.comentarios,
        // }

    console.log("Resenia: ", resenia)
    return (
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
        >
        <View style={styles.modalContainer} >
            <View style={styles.containerForm}>
                <View style={ styles.headerModal }>
                    <Text style={ styles.titleModal }>Deja una reña y da por finalizado{"\n"}el trabajo</Text>
                </View>
                <TouchableOpacity style={ styles.closeButton } onPress={closeModal}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={styles.iconClose}
                        size={24}
                />
                </TouchableOpacity>
                <KeyboardAwareScrollView style={ styles.bodyModal }>
                    {/* Formulario para crear una nueva publicación */}
                    <ReseniaForm formData={publicacion} handleChange={handleChange} reseniaData={resenia}/>
                </KeyboardAwareScrollView>
                <View style={ styles.footerModal }>
                    {/* Botones para publicar y cancelar */}
                    <TouchableOpacity style={{ ...styles.btnCancelar, ...styles.btn }} onPress={closeModal} >
                        <Text style={ styles.txtBtn }>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.btnPublicar, ...styles.btn }} onPress={onAddResenia}>
                        <Text style={ styles.txtBtn }>Enviar y finalizar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        </Modal>
    );
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
