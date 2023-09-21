import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";


import PublicacionesPost from "../../../components/trabajador/PublicacionPost";
import SinPublicaciones from "../../../components/SinPublicaciones";


export default function PubOrganizacionyorden({ publicaciones, setFilterOption,openModal}) {
  const filtrarPublicacionesPorOrden = () => {
    if (publicaciones) {
      return publicaciones.filter(
        (publicacion) => publicacion.servicio.nombre === "Organizacion y orden"
      );
    }
    return [];
  };
  const [publicacionesPorOrden, setPublicacionesPorOrden] = useState(filtrarPublicacionesPorOrden());

  

 

  useEffect(() => {
    const publicacionesPorOrden = filtrarPublicacionesPorOrden();
    setPublicacionesPorOrden(publicacionesPorOrden);
  }, [publicaciones]);

  return (
    
    <View style={styles.container}>
    {!publicacionesPorOrden || publicacionesPorOrden.length === 0 && (
        <SinPublicaciones
          mensajeTitulo="No hay publicaciones de organización y orden"
          mensajeDescripcion="¡Oops aún no han  creado ninguna publicación para ofrecer tus servicio!"
         
        />
      )}

      <PublicacionesPost
        publicacionesT={publicacionesPorOrden}
      />
      
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
