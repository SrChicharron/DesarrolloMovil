import {
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import SinSolicitudes from "../../components/SinSolicitudes.js";
import useAuth from "../../hooks/UseAuth";
import Toast from "react-native-toast-message";
import { getSolicitudes } from "../../api/cliente/SolicitudesApi";
 import { updatePostulacion } from "../../api/trabajador/PostulacionesApi.js";
import SolicitudesList from "../../components/cliente/SolicitudesList";

export default function Solicitudes() {
  const { auth, logout } = useAuth();
  const token = auth.token;
  const [solicitudes, setSolicitudes] = useState([]);
  const [modalOptionVisible, setModalOptionVisible] = useState(false);

  useEffect(() => {
    onGetSolicitudes();
  }, [solicitudes]);

  const onGetSolicitudes = async () => {
    const response = await getSolicitudes(auth.idUsuario, token);
    setSolicitudes(response.reverse());
  };

  const showToast = (title, message) => {
    Toast.show({
      type: 'success',
      text1: `${title}`,
      text2: `${message}`
    });
  }

  // FUNCIÓN PARA ACEPTAR SOLICITUDES
  const onUpdatePostulacion = async (solicitud, estatus) => {
    const objectPostulacion = {
      id: solicitud.id,
      cliente: {
        id: solicitud.cliente.id,
      },
      empleado: {
        id: solicitud.empleado.id,
      },
      publicacion: {
        id: solicitud.publicacion.id,
      },
      propiedad: {
        id: solicitud.propiedad.id,
      },
      estatus: estatus
    }
    const response = await updatePostulacion(objectPostulacion, token);
      showToast("¡Solicitud actualizada!", "El trabajador ha sido notificado");
  }

  return (
    <View style={styles.container}>
      {!solicitudes ||
        (solicitudes.length === 0 && (
          <SinSolicitudes
            mensajeTitulo="No tienes solicitudes... ¡por ahora!"
            mensajeDescripcion="Asegurate de tener publicaciones"
            txtBtn="Ir a publicaciones"
            onPressBtn={() => navigation.navigate("CuentaCliente")}
          />
        ))}
      
      {solicitudes && solicitudes.length > 0 && (
        <SolicitudesList
          solicitudes={solicitudes}
          onPress={(solicitud, estatus) => onUpdatePostulacion(solicitud, estatus)}
        />
      )}

      <Toast topOffset={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#fff",
    flex: 1,
  },
});
