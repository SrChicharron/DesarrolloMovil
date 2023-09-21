import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import welcome1 from "../assets/images/welcome1.jpg";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import pexels from "../assets/images/pexels.jpg";
import { useRoute } from "@react-navigation/native";
import useAuth from "../hooks/UseAuth";
import { addPostulacion } from "../api/trabajador/PostulacionesApi";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function DetalleHome() {
  const { auth } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const { publicacion } = route.params;
  const usuario = `${publicacion.usuario.name} ${publicacion.usuario.lastname}`;
  const direccion = `${publicacion.propiedad.calle} ${publicacion.propiedad.numeroExt}, ${publicacion.propiedad.colonia}, ${publicacion.propiedad.codigoPostal}, ${publicacion.propiedad.estado.estado}`;
  const formattedDate = new Date(publicacion.fecha).toLocaleDateString("es-ES");
  console.log("Auth ==== " + JSON.stringify(auth, null, 4));
  console.log("DetalleHome ==== " + JSON.stringify(publicacion, null, 4));
  
  const handlePostulacion = async () => {
    try {
      const response = await addPostulacion(postulacion, auth.token);
      console.log("response ==== " + JSON.stringify(response, null, 4));
      if (response) {
        showToastSuccess();
        setTimeout(() => {
          navigation.navigate('Postulaciones');
        }, 4000);
      }
    } catch (error) {
      showToastError();
      console.log(error);
    }
  };

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Postulado',
      text2: 'Te haz postulado correctamente a este trabajo 🥳'
    });
  }

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error al postularte a este trabajo 😥'
    });
  }

  const postulacion = {
    publicacion: {
      id: publicacion.id,
    },
    cliente: {
      id: publicacion.usuario.id,
    },
    empleado: {
      id: auth.idUsuario,
    },
    estatus: "pendiente"
  }

  console.log("postulacion ==== " + JSON.stringify(postulacion, null, 4));
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        <Swiper style={styles.swiperContainer}>
          <Image source={welcome1} style={styles.img} />
          <Image source={pexels} style={styles.img} />
        </Swiper>
        <View style={styles.contentInfo}>
          <View style={styles.propietarioContainer}>
            <Text style={styles.txtPropietario}>{usuario}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.txtDireccion}>{direccion} </Text>
          </View>
          <View style={styles.direccionContainer}>
            <Text style={styles.txtFecha}>{formattedDate}</Text>
          </View>
          <View style={styles.detallesContainer}>
            <Text style={styles.dettext}> Detalles</Text>
            <Text style={styles.txtDetalles}>
              {publicacion.servicio.descripcion}
            </Text>
          </View>
          <View style={styles.descripcionContainer}>
            <Text style={styles.destext}> Descripción del trabajo</Text>
            <Text style={styles.txtDescripcion}>{publicacion.descripcion}</Text>
            <Text style={styles.txtTipolimpieza}>
              {publicacion.servicio.nombre}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <Text style={styles.txtSueldo}>
          {" "}
          ${publicacion.pagoOfrecido}MXN
        </Text>


        <TouchableOpacity
          style={styles.customButtonStyle}
          onPress={handlePostulacion}
        >
          <Text style={styles.customButtonTextStyle}>Postularse</Text>
        </TouchableOpacity>
      </View>
      <Toast
        topOffset={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentInfo: {
    paddingHorizontal: 16,
  },
  img: {
    width: "100%",
    height: 305,
    resizeMode: "cover",
  },
  swiperContainer: {
    height: 305,    
  },
  txtDireccion: {
    fontSize: 14,
    color: "#707070",
    letterSpacing: 1,
  },
  txtPropietario: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  txtDescripcion: {
    fontSize: 14,
    color: "#707070",
  },
  txtTipolimpieza: {
    fontSize: 14,
    color: "#707070",
  },
  txtFecha: {
    fontSize: 14,
    color: "#707070",
  },
  propietarioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  direccionContainer: {
    marginTop: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 8,
  },
  detallesContainer: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: 8,
  },
  dettext: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  txtDetalles: {
    fontSize: 14,
    color: "#707070",
    justifyContent: "flex-end",
    color: "#707070",
  },
  descripcionContainer: {
    alignItems: "flex-start",
    borderColor: "#E0E0E0",
  },
  destext: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  txtDescripcion: {
    fontSize: 14,
    marginTop: 4,
    color: "#707070",
    justifyContent: "flex-end",
    color: "#707070",
  },

  txtTipolimpieza: {
    fontSize: 14,
    color: "#707070",
  },
  customButtonTextStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 1,
  },
  txtSueldo: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  actionsContainer: {
    positioin: "absolute",
    bottom: 0,
    height: 65,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    //Dar sombras
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  customButtonStyle: {
    backgroundColor: "#075493",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
