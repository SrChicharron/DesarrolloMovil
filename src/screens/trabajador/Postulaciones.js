import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Pendientes from "./postulaciones/Pendientes";
import Aceptadas from "./postulaciones/Aceptadas";
import Finalizados from "./postulaciones/Finalizados";
import { getPostulaciones } from "../../api/trabajador/PostulacionesApi";
import useAuth from "../../hooks/UseAuth";

export default function Postulaciones() {
  const { auth } = useAuth();
  const [activeOption, setActiveOption] = useState("pendiente");
  const [postulaciones, setPostulaciones] = useState([]);
  const token = auth.token;

  useEffect(() => {
    loadPostulaciones();
  }, [postulaciones]);

  const loadPostulaciones = async () => {
    const response = await getPostulaciones(auth.idUsuario, token);
    setPostulaciones(response);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleFilterClick = (filtro) => {
    setActiveOption(filtro);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerFilter}>
        <TouchableOpacity
          style={[
            styles.containerTextFilter,
            activeOption === "pendiente" && styles.activeOptionBtnFilter, // Estilo condicional para el botón activo
          ]}
          onPress={() => handleOptionClick("pendiente")}
        >
          <Text
            style={[
              styles.textFilter,
              activeOption === "pendiente" && styles.activeOptionTxtBtnFilter,
            ]}
          >
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.containerTextFilter,
            activeOption === "aceptada" && styles.activeOptionBtnFilter, // Estilo condicional para el botón activo
          ]}
          onPress={() => handleOptionClick("aceptada")}
        >
          <Text
            style={[
              styles.textFilter,
              activeOption === "aceptada" && styles.activeOptionTxtBtnFilter,
            ]}
          >
            Aceptados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.containerTextFilter,
            activeOption === "finalizada" && styles.activeOptionBtnFilter, // Estilo condicional para el botón activo
          ]}
          onPress={() => handleOptionClick("finalizada")}
        >
          <Text
            style={[
              styles.textFilter,
              activeOption === "finalizada" && styles.activeOptionTxtBtnFilter,
            ]}
          >
            Finalizados
          </Text>
        </TouchableOpacity>
      </View>
      {activeOption === "pendiente" && (
        <Pendientes postulaciones={postulaciones} />
      )}
      {activeOption === "aceptada" && (
        <Aceptadas postulaciones={postulaciones} />
      )}
      {activeOption === "finalizada" && (
        <Finalizados postulaciones={postulaciones} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
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
