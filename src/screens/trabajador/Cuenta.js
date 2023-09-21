import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import ModalEditPerfil from "../../components/trabajador/ModalEditPerfil";
import ProfileCard from "../../components/ProfileCard";
import DataProfile from "../../components/trabajador/DataProfile";
import Toast from 'react-native-toast-message';
import { getUsuario, updateUsuario } from "../../api/trabajador/CuentaApi";
import useAuth from "../../hooks/UseAuth";

export default function Cuenta() {
  const { auth, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [originalUserData, setOriginalUserData] = useState({
    name: "",
    lastname: "",
    cellphone: "",
    birthday: null,
    username: "",
    descripcion: "",
    foto: null,
  });
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    cellphone: "",
    birthday: null,
    username: "",
    descripcion: "",
    foto: null,
  })
  useEffect(() => {
      getUserData();
  }, [])
  // Función para actualizar el estado formData cuando cambie algún campo del formulario
  const handleChange = (name, value) => {
    setUserData((prevUserData) =>  ({
      ...prevUserData,
      [name]: value,
    }));
    console.log("handleChange ==> " + JSON.stringify(userData, null, 4))
  };

  // FUNCIÓN PARA OBTENER LA INFORMACIÓN DEL USUARIO
  const getUserData = async () => {
    const response = await getUsuario(auth.username);
    setOriginalUserData(response);
    setUserData(response);
    console.log("UserData ====> = " + JSON.stringify(userData, null, 4))
    console.log("OriginalUserData ====> = " + JSON.stringify(originalUserData, null, 4))
  }
  
  // Agregar función para formatear el objeto formData 
  const formatUserData = () => {
    setUserData({...originalUserData});
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    formatUserData();
  };


  // FUNCIÓN PARA EDITAR A UN USUARIO
  const editUsuario = async () => {
    const editUserData = {
      ...userData,
    }
    try {
      const response = await updateUsuario(editUserData, auth.username, auth.token);
      showToastSuccess();
      //Asignar el nuevo usuario al estado originalUserData. Por el momento no regresa el usuario por lo que se le asignó la copia
      setOriginalUserData(editUserData);
      closeModal();
  } catch (error) {
      console.log(error);
      showToastError();
      closeModal();
  }
  }

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerLinkAdd}>
        <TouchableOpacity
          style={styles.containerBtnLinkAdd}
          onPress={openModal}
        >
          <Text style={styles.txtAdd}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerBtnLinkAdd}
          onPress={logout}
        >
          <Text style={styles.txtAdd}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <ProfileCard 
        userData={originalUserData}
        infoUser={originalUserData}
        />

        <DataProfile userData={originalUserData} infoUser={originalUserData} titleResenias={"Lo que dicen los anfitriones sobre mi"}/>

      <ModalEditPerfil 
        modalVisible={modalVisible}
        closeModal={closeModal}
        userData={userData}
        infoUser={userData}
        handleChange={handleChange}
        editUsuario={editUsuario}
      />
      <Toast
        topOffset={20}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  containerLinkAdd: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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