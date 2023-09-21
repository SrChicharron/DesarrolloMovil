import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import HouseAspiradora from '../assets/images/HouseAspiradora.png'
import { format } from 'date-fns';
import WhatsAppIcon from "../assets/icons/WhatsAppIcon.svg";

export default function CardPublicaciones( props ) {
    const { publicacion, openModalOptions, openModalResenia } = props;
    const direccion = `${publicacion.propiedad.calle} ${publicacion.propiedad.numeroExt}, ${publicacion.propiedad.colonia}, ${publicacion.propiedad.codigoPostal}, ${publicacion.propiedad.estado.estado}`;

    const openWhatsAppchat = () => {

        const urlOpenWhatsApp = `https://wa.me/${publicacion.usuario.cellphone}`;

        Linking.canOpenURL(urlOpenWhatsApp)
            .then(supported => {
                if (supported) {
                    Linking.openURL(urlOpenWhatsApp);
                } else {
                    console.log("Don't know how to open URI: " + urlOpenWhatsApp);
                }
            })
            .catch(err => console.error("An error occurred", err));
    }

    const onLongPress = () => {
        if (publicacion.estatus === 'aceptados') {
            openModalResenia(publicacion);
        } else if (publicacion.estatus === 'activo') {
            openModalOptions(publicacion);
        } else {
            null
        }
    }

  return (
    <TouchableOpacity style={styles.containerCard} activeOpacity={1} onLongPress={onLongPress}>
        <>
            <Image source={HouseAspiradora} style={styles.img}/> 
            <View style={styles.containerInfo}>
                <Text style={styles.txtDireccion}>{direccion}</Text>
                <Text style={styles.txtDescripcion}>{publicacion.descripcion}</Text>
                <Text style={styles.txtSueldo}>${publicacion.pagoOfrecido} MXN </Text>
                <Text style={styles.txtFecha} >Fecha de publicación: {format(new Date(publicacion.fecha), 'dd/MM/yyyy')}</Text>
            </View>
        </>
        {publicacion.estatus === 'aceptados' && (
                <TouchableOpacity onPress={openWhatsAppchat}>
                    <WhatsAppIcon style={styles.waIcon} width={36} height={36} />
                </TouchableOpacity>
            )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    containerCard: {
        borderRadius: 8,
        marginBottom: 24,
    },
    img: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 4,
        resizeMode: 'center',
    },
    containerIconEdit: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    iconEdit: {
        color: '#075493',

    },
    txtDireccion: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    txtPropietario: {
        fontSize: 14,
    },
    txtDescripcion: {
        fontSize: 14,
        color: '#707070',
    },
    txtSueldo: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 2,
        textDecorationLine: 'underline',
    },
    txtFecha: {
        fontSize: 12,
    },
    waIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
    }
})
