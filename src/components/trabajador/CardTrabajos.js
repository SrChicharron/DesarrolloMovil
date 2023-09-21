import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import welcome1 from '../../assets/images/welcome1.jpg';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function CardTrabajos(props) {
  const { publicacion } = props;
  const usuario = `${publicacion.usuario.name} ${publicacion.usuario.lastname}`;
  const direccion = `${publicacion.propiedad.calle} ${publicacion.propiedad.numeroExt}, ${publicacion.propiedad.colonia}, ${publicacion.propiedad.codigoPostal}, ${publicacion.propiedad.estado.estado}`;
  const navigation = useNavigation()
  const formattedDate = new Date(publicacion.fecha).toLocaleDateString("es-ES");
  
  const handlePress = () => {
    navigation.navigate('DetalleHome', { publicacion })
  }
  
  return (
    <TouchableOpacity
      style={styles.containerCardT}
      activeOpacity={1}
      onPress={handlePress}

    >
      <>
        <Image source={welcome1} style={styles.img} />
        <View style={styles.containerInfoT}>
          <Text style={styles.txtDireccion}>{direccion}</Text>
          <Text style={styles.txtPropietario}>{usuario}</Text>

          <Text style={styles.txtDescripcion}>{publicacion.descripcion}</Text>
          <Text style={styles.txtSueldo}>${publicacion.pagoOfrecido} MXN </Text>

          <Text style={styles.txtFecha} >Fecha de publicación: {formattedDate}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCardT: {
    borderRadius: 10,
    marginBottom: 16,

  },
  img: {
    width: '100%',
    height: 295,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  containerInfoT: {

  },
  txtDireccion: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  txtPropietario: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000000'
  },
  txtDescripcion: {
    fontSize: 14,
    color: '#707070',
  },
  txtSueldo: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  txtFecha: {
    fontSize: 12,
    color: '#737373'
  },
  txttipo: {
    fontSize: 14,
    color: '#707070',
  },
  txtTipolimpieza: {
    fontSize: 14,
    color: '#707070',
  }
});

