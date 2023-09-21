import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import SinPublicaciones from "../../../components/SinPublicaciones";
import PublicacionesPost from "../../../components/trabajador/PublicacionPost";




export default function PubEspacioscomerciales({ publicaciones, setFilterOption}) {
  const filtrarPublicacionesPorEspacio = () => {
    if (publicaciones) {
      return publicaciones.filter(
        (publicacion) => publicacion.servicio.nombre === "Espacios comerciales"
      );
    }
    return []; // Retorna un array vacío si publicaciones es undefined
  };
  
  const [publicacionesPorEspacio, setPublicacionesPorEspacio] = useState(filtrarPublicacionesPorEspacio());

  

 

  useEffect(() => {
    const publicacionesPorEspacio = filtrarPublicacionesPorEspacio();
    setPublicacionesPorEspacio(publicacionesPorEspacio);
  }, [publicaciones]);

  return (
    
      <View style={styles.container}>
     {!publicacionesPorEspacio || publicacionesPorEspacio.length === 0 && (
        <SinPublicaciones
          mensajeTitulo="No hay publicaciones de espacio comercial"
          mensajeDescripcion="¡Oops aún no han  creado ninguna publicación para ofrecer tus servicio!"
         
        />
      )}

      <PublicacionesPost
        publicacionesT={publicacionesPorEspacio}
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
