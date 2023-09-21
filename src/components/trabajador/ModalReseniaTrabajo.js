import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReseniaForm from "./ReseniaForm";
import { format } from "date-fns";

export default function ModalReseniaTrabajo(props) {
    const { modalVisible, closeModal, formDataResenia, handleChange, resenia, onAddResena } = props;
    const direccion = `${formDataResenia.propiedad.calle} ${formDataResenia.propiedad.numeroExt}, ${formDataResenia.propiedad.colonia}, ${formDataResenia.propiedad.codigoPostal}, ${formDataResenia.propiedad.estado.estado}`;
   
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
                        <Text style={styles.titleModal}>Deja una reseña y da por finalizado{"\n"}el trabajo</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={styles.iconClose}
                            size={24}
                        />
                    </TouchableOpacity>
                    <KeyboardAwareScrollView style={styles.bodyModal}>
                        <Text style={styles.txtDireccion}>{direccion}</Text>
                        <Text style={styles.txtPropietario}>{formDataResenia.cliente.name} {formDataResenia.cliente.lastname}</Text>
                        <View style={styles.containerDescription}>
                            <Text style={styles.txtDescripcion}>{formDataResenia.publicacion.descripcion}</Text>

                        </View>
                        <Text style={styles.txtSueldo}>${formDataResenia.publicacion.pagoOfrecido} </Text>
                        <Text style={styles.txtFecha}>Fecha de publicación: {format(new Date(formDataResenia.publicacion.fecha), "dd/MM/yyyy")}</Text>
                        {/* Formulario para crear una nueva publicación */}
                        <ReseniaForm handleChange={handleChange} resenia={resenia} />
                    </KeyboardAwareScrollView>
                    <View style={styles.footerModal}>
                        {/* Botones para publicar y cancelar */}
                        <TouchableOpacity style={{ ...styles.btnCancelar, ...styles.btn }} onPress={closeModal} >
                            <Text style={styles.txtBtn}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnPublicar, ...styles.btn }} onPress={onAddResena}>
                            <Text style={styles.txtBtn}>Enviar y finalizar</Text>
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
    txtDireccion: {
        fontSize: 16,
        fontWeight: "bold",
    },
    txtPropietario: {
        fontSize: 14,
    },
    containerDescription: {
        maxHeight: 80,
    },
    txtDescripcion: {
        fontSize: 14,
        color: "#707070",
    },
    txtSueldo: {
        fontSize: 14,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    txtFecha: {
        fontSize: 14,
    },
});
