import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImg from '../../assets/images/welcome1.jpg'

export default function SolicitudesCard(props) {
  const { solicitud, onPress } = props;

  return (
    <View>
      <View style={styles.containerCard}>
        <View style={styles.dividedView}>
          <View style={styles.containerImg}>
            <Image source={ProfileImg} style={styles.profileiImg} />
            <View
              style={[
                styles.containerIsApproved,
                {
                  backgroundColor:
                  solicitud.estatus === "aceptada"
                      ? "#D4F4E2"
                      : solicitud.estatus === `rechazada`
                        ? "#f8d7da"
                        : "#E6E6E6",
                },
              ]}
            >
              <Text style={[
                styles.txtIsApproved,
                {
                  color:
                    solicitud.estatus === `finalizada`
                      ? "#000" :
                      solicitud.estatus === "aceptada"
                      ? "#000"
                      : "#000",
                },
              ]}>{solicitud.estatus}</Text>
            </View>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.textNombre}>{solicitud.empleado.name} {solicitud.empleado.lastname}</Text>
            <Text style={styles.textRol}>Celular: {solicitud.empleado.cellphone}</Text>
            <Text style={styles.textDescripcion}>{solicitud.empleado.name} se postuló para <Text style={{ fontWeight: 'bold' }}>{solicitud.propiedad.titulo}</Text> ubicado en {solicitud.propiedad.calle} #{solicitud.propiedad.numeroExt} Col. {solicitud.propiedad.colonia} {solicitud.propiedad.codigoPostal}, {solicitud.propiedad.estado.estado}</Text>
          </View>
        </View>
        <View style={styles.dividedViewBtns}>
          <TouchableOpacity onPress={() => onPress(solicitud, 'aceptada')} style={styles.btnAceptar}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(solicitud, 'rechazada')} style={styles.btnRechazar}>
            <Text style={{ textAlign: 'center', color: '#000' }}>Rechazar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerCard: {

    backgroundColor: '#FFF',
    margin: 8,
    padding: 16,
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
  dividedView: {
    flexDirection: 'row',
  },
  containerImg: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileiImg: {
    width: 140,
    height: 140,
    borderRadius: 100
  },
  containerInfo: {
    width: '55%',
  },
  textNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textRol: {
    fontSize: 14,
    textAlign: 'left'
  },
  viewStars: {

  },
  textDescripcion: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#707070',
  },
  containerIsApproved: {
    backgroundColor: "#E6E6E6",
    borderRadius: 50,
    width: 100,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  txtIsApproved: {
    textAlign: "center",
    fontSize: 12,

  },
  starRating: {
    alignSelf: "flex-start",
  },
  dividedViewBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%'
  },
  btnAceptar: {
    backgroundColor: '#075493',
    borderRadius: 10,
    paddingVertical: 8,
    width: '48%',
  },
  btnRechazar: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    paddingVertical: 8,
    width: '48%',
  }
})