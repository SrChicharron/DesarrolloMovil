import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SinSolicitudes from "../../components/SinSolicitudes";
import ListPropiedades from "../../components/propiedad/ListPropiedades";
import CardPropiedades from "../../components/CardPropiedades";
import ModalAddPropiedad from "../../components/ModalAddPropiedad";
import AccionesModal from "../../components/AccionesModal";
import {
  fetchPropiedades,
  registrarPropiedad,
  deletePropiedad,
} from "../../api/propiedad/PropiedadesAPI";
import useAuth from "../../hooks/UseAuth";
import Toast from 'react-native-toast-message';

export default function Propiedades() {
  //useauth par obtener el id del cliente
  const { auth } = useAuth();
  const token = auth.token;
  //usestate para guardar informacion
  const [activeOption, setActiveOption] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptionVisible, setModalOptionVisible] = useState(false);
  const [titleModalPropiedad, setTitleModalPropiedad] = useState("");
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadEdicion, setPropiedadEdicion] = useState({
    id: "",
    titulo: "",
    calle: "",
    numeroExt: "",
    codigoPostal: "",
    colonia: "",
    referencias: "",
    estatus: "pendiente",
    estado: {
      id: "",
      estado: "",
    },
    tipoPropiedad: {
      id: "",
      tipo: "",
    },
    idUsuario: auth.idUsuario,
  });
  //form para gardar la info y enviarla al back
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    calle: "",
    numeroExt: "",
    codigoPostal: "",
    colonia: "",
    referencias: "",
    estatus: "pendiente",
    estado: {
      id: "",
      estado: "",
    },
    tipoPropiedad: {
      id: "",
      tipo: "",
    },
    idUsuario: auth.idUsuario,
  });
  const [comprobantes, setComprobantes] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  // Función para actualizar el estado formData cuando cambie algún campo del formulario
  const handleChange = (name, value) => {
    if (name === "estado") {
      setFormData((prevState) => ({
        ...prevState,
        estado: {
          ...prevState.estado,
          id: value,
        },
      }));
    } else if (name === "tipoPropiedad") {
      setFormData((prevState) => ({
        ...prevState,
        tipoPropiedad: {
          ...prevState.tipoPropiedad,
          id: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    //console.log(formData);
  };

  // Simulación de llamada a API para obtener los servicios
  useEffect(() => {
    loadData();
  }, [formData, propiedades]);

  const showToastSuccess = (title, message) => {
    Toast.show({
      type: 'success',
      text1: `${title}`,
      text2: `${message} 🥳`
    });
  }

  const showToastError = (title, message) => {
    Toast.show({
      type: 'error',
      text1: `${title}`,
      text2: `${message} 😥`
    });
  }

  const handleImagenes = (nvaImagen) => {
    setImagenes((prevImagenes) => [...prevImagenes, nvaImagen]);
  };

  const handleComprobantes = (nvoComprobante) => {
    setComprobantes((prevComprobantes) => [
      ...prevComprobantes,
      nvoComprobante,
    ]);
  };

  const formatFormData = () => {
    setFormData({
      id: "",
      titulo: "",
      calle: "",
      numeroExt: "",
      codigoPostal: "",
      colonia: "",
      referencias: "",
      estatus: "pendiente",
      estado: {
        id: "",
        estado: "",
      },
      tipoPropiedad: {
        id: "",
        tipo: "",
      },
      idUsuario: auth.idUsuario,
    });
    setImagenes([]);
    setComprobantes([]);
  };

  const openModal = (titleModal) => {
    setTitleModalPropiedad(titleModal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    formatFormData();
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  //cuando se abre el modal se envia la data de la propiedad al form
  const openModalOptions = () => {
    console.log("openModalOptions");
    setModalOptionVisible(true);
    setFormData({
      id: propiedadEdicion.id,
      titulo: propiedadEdicion.titulo,
      calle: propiedadEdicion.calle,
      numeroExt: propiedadEdicion.numeroExt,
      codigoPostal: propiedadEdicion.codigoPostal,
      colonia: propiedadEdicion.colonia,
      referencias: propiedadEdicion.referencias,
      estatus: "pendiente",
      estado: {
        id: propiedadEdicion.estado.id,
        estado: propiedadEdicion.estado.estado,
      },
      tipoPropiedad: {
        id: propiedadEdicion.tipoPropiedad.id,
        tipo: propiedadEdicion.tipoPropiedad.tipo,
      },
      idUsuario: propiedadEdicion.idUsuario,
    });
  };

  const closeModalOptions = () => {
    setModalOptionVisible(false);
  };

  const openModalPropiedad = () => {
    console.log("openModalPropiedad");
    setModalOptionVisible(false);
    openModal("Editar propiedad");
  };

  const openModalPropiedadAdd = () => {
    console.log("openModalPropiedadAdd");
    setModalOptionVisible(false);
    openModal("Agregar propiedad");
  };
  //consulta las propiedades
  const loadData = async () => {
    const idCliente = auth.idUsuario;
    const resultPropiedades = await fetchPropiedades(idCliente, token);
    setPropiedades(resultPropiedades.reverse());
  };
  //para registrar
  const handleRegister = () => {
    // console.log(formData);
    // console.log(imagenes);
    // console.log(comprobantes);
    const regProp = registrarPropiedad(formData, imagenes, comprobantes, token);
    // HACER LA VALIDACIÓN PARA MOSTRAR EL TOAST
    if (regProp) {
      showToastSuccess('Propiedad registrada', 'La propiedad se registró correctamente');
    } else {
      showToastError('Propiedad no registrada', 'La propiedad no se pudo registrar');
    }
    formatFormData();
    closeModal();
  };
  //para eliminar
  const handleDelete = () => {
    setFormData({
      id: propiedadEdicion.id,
      titulo: propiedadEdicion.titulo,
      calle: propiedadEdicion.calle,
      numeroExt: propiedadEdicion.numeroExt,
      codigoPostal: propiedadEdicion.codigoPostal,
      colonia: propiedadEdicion.colonia,
      referencias: propiedadEdicion.referencias,
      estatus: "pendiente",
      estado: {
        id: propiedadEdicion.estado.id,
        estado: propiedadEdicion.estado.estado,
      },
      tipoPropiedad: {
        id: propiedadEdicion.tipoPropiedad.id,
        tipo: propiedadEdicion.tipoPropiedad.tipo,
      },
      idUsuario: propiedadEdicion.idUsuario,
    });
    console.log(formData);
    const deleteProp = deletePropiedad(formData, token);
    // Hacer la validación para mostrar el toast
    if (deleteProp.message === "Eliminacion correcta") {
      showToastSuccess('Propiedad eliminada', 'La propiedad se eliminó correctamente');
      closeModalOptions();
    } else {
      showToastError('Propiedad no eliminada', 'La propiedad no se pudo eliminar');
    }
    formatFormData();
  };

  return (
    <>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {propiedades.length === 0 && (
        <SinSolicitudes
          mensajeTitulo="No tienes propiedades publicadas"
          mensajeDescripcion="Publica una propiedad para poder publicar un trabajo"
          txtBtn="Añadir"
          onPressBtn={openModalPropiedadAdd}
        />
      )}
      <View style={styles.containerLinkAdd}>
        <TouchableOpacity
          style={styles.containerBtnLinkAdd}
          onPress={openModalPropiedadAdd}
        >
          <Text style={styles.txtAdd}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <ListPropiedades
        propiedades={propiedades}
        propiedadEdicion={propiedadEdicion}
        setPropiedadEdicion={setPropiedadEdicion}
        formData={formData}
        openModalOptions={openModalOptions}
        setModalOptionVisible={setModalOptionVisible}
        closeModalOptions={closeModalOptions}
      />
      <ModalAddPropiedad
        modalVisible={modalVisible}
        closeModal={closeModal}
        handleRegister={handleRegister}
        formData={formData}
        handleChange={handleChange}
        handleImagenes={handleImagenes}
        handleComprobantes={handleComprobantes}
        formatFormData={formatFormData}
        titleModal={titleModalPropiedad}
      />

      <AccionesModal
        modalOptionVisible={modalOptionVisible}
        setModalOptionVisible={setModalOptionVisible}
        closeModalOptions={closeModalOptions}
        txtBtnBlue="Editar"
        txtBtnRed="Eliminar"
        onPressBlue={openModalPropiedad}
        onPressRed={handleDelete}
      />
    </ScrollView>
      <Toast topOffset={20} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
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
  containerFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingBottom: 8,
    width: "100%",
  },
  containerTextFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    width: "30%",
    textAlign: "center",
    alignItems: "center",
  },
  activeOptionBtnFilter: {
    color: "#E6E6E6",
  },
  activeOptionTxtBtnFilter: {
    color: "#075493",
    fontWeight: "bold",
  },
});
