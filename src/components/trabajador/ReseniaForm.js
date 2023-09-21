import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState} from "react";
import StarRating from "react-native-star-rating-widget";

export default function ReseniaForm( props ) {
    const { handleChange, resenia } = props;

    return (
      <View style={styles.container}>
        <StarRating onChange={(rating) => handleChange("calificacion", rating)} rating={resenia.calificacion} starSize={54} style={styles.starRating}/>
        <TextInput
          style={{ ...styles.input, ...styles.labelDescripcion }}
          placeholder="Escribe una reseña del trabajador (opcional)"
          multiline
          onChangeText={(resenia) => handleChange("comentarios", resenia)}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {},
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
    },
    starRating: {
      alignSelf: "flex-start",
    }
  });
  