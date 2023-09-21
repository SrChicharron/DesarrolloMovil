import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { getServicios, getPropiedades } from '../api/cliente/PublicacionesApi';


export default function PublicacionForm(props) {
  const { publicacion, handleChange, listaServicios, listaPropiedades } = props;

  const servicioIndex = listaServicios.findIndex(servicio => servicio.id === publicacion.servicio.id);
  const propiedadIndex = listaPropiedades.findIndex(propiedad => propiedad.id === publicacion.propiedad.id);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de servicio</Text>
      <Picker
        style={styles.picker}
        selectedValue={servicioIndex}
        onValueChange={(itemValue) => handleChange("servicio", listaServicios[itemValue])}
      >
        <Picker.Item label="Seleccione un servicio" value={-1} />
        {listaServicios.map((servicio, index) => (
          <Picker.Item
            key={servicio.id}
            label={servicio.nombre}
            value={index}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Propiedad</Text>
      <Picker
        style={styles.picker}
        selectedValue={propiedadIndex}
        onValueChange={(itemValue) => handleChange("propiedad", listaPropiedades[itemValue])}
      >
        <Picker.Item label="Seleccione una propiedad" value={-1} />
        {listaPropiedades.map((propiedad, index) => (
          <Picker.Item
            key={propiedad.id}
            label={propiedad.titulo}
            value={index}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Pago ofrecido</Text>
      <TextInput
        style={styles.input}
        placeholder="$ 400 MXN"
        keyboardType="numeric"
        value={publicacion.pagoOfrecido.toString()}
        onChangeText={(text) => handleChange("pagoOfrecido", text)}
      />

      <Text style={styles.label}>Descripción del trabajo</Text>
      <TextInput
        style={{ ...styles.input, ...styles.labelDescripcion }}
        placeholder="Descripción del trabajo"
        multiline
        value={publicacion.descripcion}
        onChangeText={(text) => handleChange("descripcion", text)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
  },
  labelDescripcion: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,

  }
});
