import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SinSolicitudes from "../../../components/SinSolicitudes";
import ModalPublicacion from "../../../components/ModalAddPublicacion";
import AccionesModal from "../../../components/AccionesModal";
import PublicacionesList from "../../../components/cliente/PublicacionesList";
import useAuth from "../../../hooks/UseAuth";
import Toast from 'react-native-toast-message';

export default function PublicacionesActivas({
  publicaciones,
  onDeletePublicacion,
  onUpdatePublicacion,
  onAddPublicacion,
  listaServicios,
  listaPropiedades,
}) {
  const { auth } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptionVisible, setModalOptionVisible] = useState(false);
  const [titleModalPublicacion, setTitleModalPublicacion] = useState("");
  const [indicador, setIndicador] = useState("");
  const [publicacionData, setPublicacionData] = useState({
    id: 0,
    descripcion: "",
    estatus: "",
    fecha: "",
    pagoOfrecido: 0.0,
    usuario: {
      id: 0,
      name: "",
      lastname: "",
      cellphone: "",
      birthday: "",
      username: "",
    },
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
    servicio: {
      id: 0,
      nombre: "",
      descripcion: "",
    },
  });

  // FUNCIÓN PARA FILTRAR LAS PUBLICACIONES ACTIVAS
  const filtrarPublicacionesActivas = () => {
    return publicaciones.filter(
      (publicacion) => publicacion.estatus === "activo"
    );
  };

  // Estado para almacenar las publicaciones activas
  const [publicacionesActivas, setPublicacionesActivas] = useState(
    filtrarPublicacionesActivas()
  );

  useEffect(() => {
    const publicacionesActivas = filtrarPublicacionesActivas();
    setPublicacionesActivas(publicacionesActivas);
  }, [publicaciones]);

  // Función para actualizar el estado publicacion cuando cambie algún campo del formulario
  const handleChange = (name, value) => {
    setPublicacionData({
      ...publicacionData,
      [name]: value,
    });
    console.log(JSON.stringify(publicacionData, null, 4));
  };

  // Agregar función para formatear el objeto publicacion
  const formatpublicacionData = () => {
    setPublicacionData({
      id: 0,
      descripcion: "",
      estatus: "",
      fecha: "",
      pagoOfrecido: 0.0,
      usuario: {
        id: 0,
        name: "",
        lastname: "",
        cellphone: "",
        birthday: "",
        username: "",
      },
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
      servicio: {
        id: 0,
        nombre: "",
        descripcion: "",
      },
    });
  };

  const openModal = (titleModal) => {
    setTitleModalPublicacion(titleModal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    formatpublicacionData();
  };

  const openModalOptions = (publicacion) => {
    console.log("openModalOptions");
    setPublicacionData(publicacion);
    setModalOptionVisible(true);
  };

  const closeModalOptions = () => {
    setModalOptionVisible(false);
  };
  const openModalPublicacion = (publicacion) => {
    console.log("openModalPublicacion");
    setIndicador("update");
    setModalOptionVisible(false);
    setPublicacionData(publicacion);
    openModal("Editar publicación");
  };
  const openModalPublicacionAdd = () => {
    console.log("openModalPublicacionAdd");
    setIndicador("add");
    setModalOptionVisible(false);
    openModal("Agregar publicación");
  };

  const deletePublicacion = (publicacion) => {
    setModalOptionVisible(false);
    onDeletePublicacion(publicacion);
  };

  const updatePublicacion = () => {
    closeModal();
    console.log(
      "Publicación Data que se envia a editar =====>>>>> " +
        JSON.stringify(publicacionData, null, 4)
    );
    onUpdatePublicacion(publicacionData);
    formatpublicacionData();
  };

  const addPublicacion = () => {
    closeModal();
    const newPublicacion = {
      ...publicacionData,
      id: undefined,
      fecha: new Date(),
      estatus: "activo",
      usuario: {
        ...publicacionData.usuario,
        id: auth.idUsuario,
      },
    };
    console.log(
      "Publicación Data que se envia a agregar =====>>>>> " +
        JSON.stringify(newPublicacion, null, 4)
    );
    onAddPublicacion(newPublicacion);
    formatpublicacionData();
  };

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Actualizado',
      text2: 'Tu información se ha actualizado correctamente 🥳'
    });
  }

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error al actualizar tu información 😥'
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLinkAdd}>
        <TouchableOpacity
          style={styles.containerBtnLinkAdd}
          onPress={openModalPublicacionAdd}
        >
          <Text style={styles.txtAdd}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {!publicacionesActivas ||
        (publicacionesActivas.length === 0 && (
          <SinSolicitudes
            mensajeTitulo="No tienes publicaciones activas"
            mensajeDescripcion="Publica un trabajo y elije al mejor trabajador para tí"
            txtBtn="Publicar"
            onPressBtn={openModalPublicacionAdd}
          />
        ))}

      <PublicacionesList
        publicaciones={publicacionesActivas}
        openModalOptions={(publicacion) => openModalOptions(publicacion)}
      />

      <ModalPublicacion
        modalVisible={modalVisible}
        closeModal={closeModal}
        publicacion={publicacionData}
        handleChange={handleChange}
        formatpublicacion={formatpublicacionData}
        titleModal={titleModalPublicacion}
        updatePublicacion={updatePublicacion}
        listaServicios={listaServicios}
        listaPropiedades={listaPropiedades}
        addPublicacion={addPublicacion}
        indicador={indicador}
      />

      <AccionesModal
        modalOptionVisible={modalOptionVisible}
        closeModalOptions={closeModalOptions}
        txtBtnBlue="Editar"
        txtBtnRed="Eliminar"
        onPressBlue={(publicacion) => openModalPublicacion(publicacion)}
        onPressRed={(publicacion) => deletePublicacion(publicacion)}
        publicacion={publicacionData}
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
