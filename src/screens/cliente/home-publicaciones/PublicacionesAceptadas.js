import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SinSolicitudes from "../../../components/SinSolicitudes";
import ModalResenia from "../../../components/ModalResenia";
import PublicacionesList from "../../../components/cliente/PublicacionesList";
import {
  addResena,
  updatePublicacion,
} from "../../../api/trabajador/PostulacionesApi";
import Toast from "react-native-toast-message";
import useAuth from "../../../hooks/UseAuth";

export default function PublicacionesAceptadas( { publicaciones } ) {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const token = auth.token;
  const [modalVisible, setModalVisible] = useState(false);
  const [publicacion, setPublicacion] = useState({});
  const [resenia, setResenia] = useState({
    publicacion: {
      id: 0,
    },
    evaluado: {
      id: 0,
    },
    evaluador: {
      id: 0,
    },
    calificacion: 0,
    comentarios: "",
  });
  
  // FUNCIÓN PARA FILTRAR LAS PUBLICACIONES ACTIVAS
  const filtrarPublicacionesActivas = () => {
    return publicaciones.filter(publicacion => publicacion.estatus === "aceptados");
  }
  
  // Estado para almacenar las publicaciones activas
  const [publicacionesActivas, setPublicacionesActivas] = useState(filtrarPublicacionesActivas());

  useEffect(() => {
    const publicacionesActivas = filtrarPublicacionesActivas();
    setPublicacionesActivas(publicacionesActivas);
  }, [publicaciones]);

  // Función para actualizar el estado publicacion cuando cambie algún campo del formulario
  const handleChange = (name, value) => {
    setResenia({
      ...resenia,
      [name]: value,
    });
    console.log(resenia)
  };

    // console.log("Publicaciones activas: ", JSON.stringify(publicacionesActivas, null, 4))
  // Agregar función para formatear el objeto publicacion 
  const formatReseniaData = () => {
    setResenia({
      publicacion: {
        id: 0,
      },
      evaluado: {
        id: 0,
      },
      evaluador: {
        id: 0,
      },
      calificacion: 0,
      comentarios: "",
    });
  }

  const openModalResenia = (publicacion) => {
    setPublicacion(publicacion);
    setModalVisible(true);
  }

  const closeModalResenia = () => {
    setModalVisible(false);
    formatReseniaData();
  }

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Trabajo finalizado",
      text2: "Tu evaluación se ha enviado correctamente 🥳",
    });
  };

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Ups...!",
      text2: "Ha ocurrido un error al finalizar tu evaluación 😥",
    });
  };

  // FUNCIÓN PARA AGREGAR LA RESEÑA
  const onAddResenia = async () => {
    resenia.publicacion.id = publicacion.id;
    resenia.evaluado.id = publicacion.usuario.id;
    resenia.evaluador.id = auth.idUsuario;

    try {
      const response = await addResena(resenia, token);
      console.log("Response PubAcep: " + JSON.stringify(response, null, 4));
      if (response) {
        const dataPublicacionUpdate = {
          id: publicacion.id,
          descripcion: publicacion.descripcion,
          estatus: "finalizados",
          fecha: publicacion.fecha,
          pagoOfrecido: publicacion.pagoOfrecido,
          usuario: {
            id: publicacion.usuario.id,
          },
          propiedad: {
            id: publicacion.propiedad.id,
          },
          servicio: {
            id: publicacion.servicio.id,
          }
        };
        const responseUpdatePostulacion = await updatePublicacion(
          dataPublicacionUpdate,
          token
        );
        if (responseUpdatePostulacion) {
          showToastSuccess();
          closeModalResenia();
        }
      }
    } catch (error) {
      console.log(error);
      showToastError();
    }
  };

  return (
      <View style={styles.container}>
      {!publicacionesActivas || publicacionesActivas.length === 0 && (
        <SinSolicitudes 
          mensajeTitulo='No haz aceptado ninguna solicitud'
          mensajeDescripcion='Acepta a un trabajador para limpiar tu hogar'
          txtBtn="Ver mis solicitudes"
          onPressBtn={() => navigation.navigate("SolictudesCliente")}
        />
      )}

        <PublicacionesList 
          publicaciones={publicacionesActivas} 
          openModalResenia={(publicacion) => openModalResenia (publicacion)}
          closeModalOptions={closeModalResenia}
        />


      <ModalResenia
        modalVisible={modalVisible}
        closeModal={closeModalResenia}
        publicacion={publicacion}
        handleChange={handleChange}
        resenia={resenia}
        onAddResenia={onAddResenia}
      />
      <Toast topOffset={20} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  containerLinkAdd: {
    alignItems: "flex-end",
  },
  containerBtnLinkAdd: {
    borderRadius: 8,
    marginBottom: 16,
  },
  txtAdd: {
    color: "#A3A3A3",
    textDecorationLine: "underline",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

