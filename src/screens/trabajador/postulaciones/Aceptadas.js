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
import ModalReseniaTrabajo from "../../../components/trabajador/ModalReseniaTrabajo";
import PostulacionesList from "../../../components/trabajador/PostulacionesList";
import {
  addResena,
  updatePostulacion,
} from "../../../api/trabajador/PostulacionesApi";
import Toast from "react-native-toast-message";
import useAuth from "../../../hooks/UseAuth";

export default function Aceptadas({ postulaciones }) {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [postulacionesAceptadas, setPostulacionesAceptadas] = useState([]);
  const [formDataResenia, setFormDataResenia] = useState({
    id: 0,
    publicacion: {
      id: 0,
      descripcion: "",
      estatus: "",
      fecha: null,
      pagoOfrecido: 0.0,
      idTipoServicio: 0,
      idUsuario: 0,
      idPropiedad: 0,
    },
    cliente: {
      id: 0,
      name: "",
      lastname: "",
      cellphone: "",
      birthday: "",
      username: "",
      descripcion: "",
      foto: null,
      comprobante: "",
    },
    empleado: {
      id: 0,
      name: "",
      lastname: "",
      cellphone: "",
      birthday: "",
      username: "",
      descripcion: "",
      foto: null,
      comprobante: "",
    },
    estatus: "",
    propiedad: {
      id: 0,
      titulo: "",
      calle: "",
      numeroExt: "",
      codigoPostal: "",
      colonia: "",
      referencias: "",
      estatus: "",
      tipoPropiedad: {
        id: 0,
        tipo: "",
      },
      estado: {
        id: 0,
        estado: "",
      },
      idUsuario: 0,
      foto: [],
      comprobante: [],
    },
  });
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
  const token = auth.token;

  useEffect(() => {
    setPostulacionesAceptadas(filterPostulacionesAceptadas());
  }, [postulaciones]);

  // FUNCIÓN PARA FILTRAR LAS POSTULACIONES ACEPTADAS
  const filterPostulacionesAceptadas = () => {
    return postulaciones.filter(
      (postulacion) => postulacion.estatus === "aceptada"
    );
  };

  // Función para actualizar el estado formData cuando cambie algún campo del formulario
  const handleChange = (name, value) => {
    setResenia({
      ...resenia,
      [name]: value,
    });
  };

  // Agregar función para formatear el objeto formData
  const formatFormData = () => {
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
  };

  const openModal = (postulacion) => {
    setFormDataResenia(postulacion);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    formatFormData();
  };

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Postulación finalizada",
      text2: "Tu evaluación se ha enviado correctamente 🥳",
    });
  };

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Ha ocurrido un error al finalizar tu evaluación 😥",
    });
  };

  // FUNCIÓN PARA AGREGAR LA RESEÑA
  const onAddResena = async () => {
    resenia.publicacion.id = formDataResenia.publicacion.id;
    resenia.evaluado.id = formDataResenia.cliente.id;
    resenia.evaluador.id = formDataResenia.empleado.id;

    try {
      const response = await addResena(resenia, token);
      if (response) {
        const dataPostulacionUpdate = {
          id: formDataResenia.id,
          publicacion: {
            id: formDataResenia.publicacion.id,
          },
          cliente: {
            id: formDataResenia.cliente.id,
          },
          empleado: {
            id: formDataResenia.empleado.id,
          },
          estatus: "finalizada",
        };
        const responseUpdatePostulacion = await updatePostulacion(
          dataPostulacionUpdate,
          token
        );
        showToastSuccess();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      showToastError();
    }
  };

  return (
    <View style={styles.container}>
      {!postulacionesAceptadas ||
        (postulacionesAceptadas.length === 0 && (
          <SinSolicitudes
            mensajeTitulo="No tienes postulaciones aceptadas... ¡por ahora!"
            mensajeDescripcion="Sé paciente, pronto te aceptarán en un trabajo. Por ahora, puedes seguir buscando"
            txtBtn="Empezar a buscar"
            onPressBtn={() => navigation.navigate("Publicaciones")}
          />
        ))}
      {/* <CardPostulaciones activeOpacity={null} onLongPress={openModal} isAceppted={'aceptado'} formData={formData} /> */}

      <PostulacionesList
        postulaciones={postulacionesAceptadas}
        activeOpacity={null}
        openModal={(postulacion) => openModal(postulacion)}
      />

      <ModalReseniaTrabajo
        modalVisible={modalVisible}
        closeModal={closeModal}
        formDataResenia={formDataResenia}
        handleChange={handleChange}
        resenia={resenia}
        onAddResena={onAddResena}
      />
      <Toast topOffset={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
});
