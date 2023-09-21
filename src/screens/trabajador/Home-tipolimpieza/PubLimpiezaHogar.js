import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SinPublicaciones from "../../../components/SinPublicaciones";
import PublicacionesPost from "../../../components/trabajador/PublicacionPost";

export default function PubLimpiezaHogar({ publicaciones }) {
  const filtrarPublicacionesPorLimpieza = () => {
    if (publicaciones) {
      return publicaciones.filter(
        (publicacion) => publicacion.servicio.nombre === "Limpieza Hogar"
      );
    }
    return []; // Retorna un array vacío si publicaciones es undefined
  };

  const [publicacionesPorLimpieza, setPublicacionesPorLimpieza] = useState(filtrarPublicacionesPorLimpieza());

  useEffect(() => {
    const publicacionesPorLimpieza = filtrarPublicacionesPorLimpieza();
    setPublicacionesPorLimpieza(publicacionesPorLimpieza);
  }, [publicaciones]);

  return (
    <View style={styles.container}>
      {!publicacionesPorLimpieza || publicacionesPorLimpieza.length === 0 && (
        <SinPublicaciones
          mensajeTitulo="No hay publicaciones de limpieza hogar"
          mensajeDescripcion="¡Oops aún no han  creado ninguna publicación para ofrecer tus servicio!"
        />
      )}

      <PublicacionesPost
        publicacionesT={publicacionesPorLimpieza}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyContent: {
    width: '99%',
    margin: 2,
    marginBottom: 8,
    height: 250,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    elevation: 5, // Esto agregará la sombra en Android
    shadowColor: '#000', // Esto agregará la sombra en iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emptyDescription: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center'
  },

});
