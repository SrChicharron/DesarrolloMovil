import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Swiper from 'react-native-swiper';

export default function CardPropiedades(props) {
  const {
    propiedadData,
    propiedadEdicion,
    setPropiedadEdicion,
    onLongPress,
  } = props;
  const longPress = () => {
    setPropiedadEdicion(propiedadData);
    console.log(propiedadEdicion);
    if(propiedadEdicion.id!==""){
      onLongPress();
    }
  };
  // Cons para hacer la dirección con los datos de formData
  const fotos=propiedadData.foto;
    const direccion = propiedadData.calle + " " + propiedadData.numeroExt + ", " + propiedadData.colonia + ", " + propiedadData.codigoPostal + ", " + propiedadData.estado.estado;
  return (
    <TouchableOpacity
      style={styles.containerCard}
      activeOpacity={1}
      onLongPress={longPress}
    >
      <>
        
        <Swiper style={styles.swiperContainer}>
        {fotos.map(imageData => (
        <Image 
        key={imageData.id}
        source={{ uri: `http://74.208.25.75/images/cleanhome/${imageData.foto}` }}
        style={styles.img}
      />
      ))}

        </Swiper>
        <View style={styles.containerInfo}>
          <Text style={styles.txtDireccion}>
            {direccion}
          </Text>
          <Text style={styles.txtTituloCasa}>{propiedadData.titulo}</Text>
          <Text style={styles.txtTituloCasa}>
            Tipo de propiedad: {propiedadData.tipoPropiedad.tipo}
          </Text>
          <Text style={styles.txtReferencias}>
            {propiedadData.referencias}
          </Text>
          <View
            style={[
              styles.containerIsApproved,
              {
                backgroundColor:
                propiedadData.estatus === "aprobado"
                    ? "#D4F4E2"
                    : propiedadData.estatus === "rechazado"
                    ? "#EE7677"
                    : "#E6E6E6",
              },
            ]}
          >
            <Text style={[
              styles.txtIsApproved,
              {
                color:
                propiedadData.estatus === "rechazado"
                    ? "#fff"
                    : "#000",
              },
            ]}>{propiedadData.estatus}</Text>
          </View>
        </View>
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    borderRadius: 8,
    marginBottom: 24,
  },
  img: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    resizeMode: "center",
  },
  containerInfo: {},
  txtDireccion: {
    fontSize: 16,
    fontWeight: "bold",
  },
  txtTituloCasa: {
    fontSize: 14,
  },
  txtReferencias: {
    fontSize: 14,
    color: "#707070",
  },
  containerIsApproved: {
    backgroundColor: "#E6E6E6",
    borderRadius: 50,
    width: 100,
    paddingVertical: 4,
    //Alinearlo a la derecha
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  txtIsApproved: {
    textAlign: "center",
    fontSize: 12,

  },
  swiperContainer: {
    height:300, 
  },
});
