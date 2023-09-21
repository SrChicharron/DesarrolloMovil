import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Room from "../../assets/images/room.jpg";
import WhatsAppIcon from "../../assets/icons/WhatsAppIcon.svg";
import MapsIcon from "../../assets/icons/MapsIcon.svg";
import { format } from "date-fns";

export default function CardPostulaciones(props) {
  const { postulacion, activeOpacity, openModal } = props;

  const direccion = `${postulacion.propiedad.calle} ${postulacion.propiedad.numeroExt}, ${postulacion.propiedad.colonia}, ${postulacion.propiedad.codigoPostal}, ${postulacion.propiedad.estado.estado}`;

  const openWhatsAppchat = () => {
    const urlOpenWhatsApp = `https://wa.me/${postulacion.cliente.cellphone}`;

    Linking.canOpenURL(urlOpenWhatsApp)
      .then((supported) => {
        if (supported) {
          Linking.openURL(urlOpenWhatsApp);
        } else {
          console.log("Don't know how to open URI: " + urlOpenWhatsApp);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const openGoogleMaps = (direccion) => {
  const formattedAddress = encodeURIComponent(direccion);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

  Linking.openURL(mapUrl)
    .catch((err) => console.error("Error al abrir Google Maps: ", err));
};

const onLongPress = () => {
    if (postulacion.estatus === "aceptada") {
        openModal(postulacion);
    } else {
        return null;
    }
}

  return (
    <TouchableOpacity
      style={styles.containerCard}
      activeOpacity={activeOpacity}
      onLongPress={onLongPress}
    >
      <Image source={Room} style={styles.img} />
      <View style={styles.containerInfo}>
        <View style={styles.containerDireccion}>
          <Text style={styles.txtDireccion}>{direccion}</Text>
        </View>
        <Text style={styles.txtPropietario}>
          {postulacion.cliente.name} {postulacion.cliente.lastname}
        </Text>
        <View style={styles.containerDescription}>
          <Text style={styles.txtDescripcion}>{postulacion.publicacion.descripcion}</Text>
        </View>
        <Text style={styles.txtSueldo}>${postulacion.publicacion.pagoOfrecido} </Text>
        {postulacion.estatus === "aceptada" ? (
          <Text style={styles.txtFecha}>
            {format(new Date(postulacion.publicacion.fecha), "dd/MM/yyyy")}
          </Text>
        ) : (
          <Text style={styles.txtFecha}>
            Fecha de publicación:{" "}
            {format(new Date(postulacion.publicacion.fecha), "dd/MM/yyyy")}
          </Text>
        )}
      </View>
      {/* validación si formData.isAceppted es aceptado aparezca el icono de whatsapp */}
      {postulacion.estatus === "aceptada" && (
        <View style={styles.containerIcons}>
          <TouchableOpacity onPress={openWhatsAppchat}>
            <WhatsAppIcon style={styles.waIcon} width={28} height={28} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openGoogleMaps(direccion)}>
            <MapsIcon style={styles.waIcon} width={32} height={32} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    width: "99%",
    height: 130,
    margin: 2,
    marginBottom: 16,
    flexDirection: "row",
  },
  img: {
    width: "40%",
    height: 130,
    borderRadius: 8,
    resizeMode: "center",
    marginRight: 16,
  },
  containerInfo: {
    width: "55%",
    justifyContent: "space-between",
  },
  containerDireccion: {
    maxHeight: 40,
  },
  txtDireccion: {
    fontSize: 14,
    fontWeight: "bold",
  },
  txtPropietario: {
    fontSize: 12,
  },
  containerDescription: {
    maxHeight: 35,
  },
  txtDescripcion: {
    fontSize: 12,
    color: "#707070",
  },
  txtSueldo: {
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  txtFecha: {
    fontSize: 12,
  },
  containerIcons: {
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
  }
});
