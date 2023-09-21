import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import PublicacionCardT from './CardTrabajos';

export default function PublicacionPost( props ) {
  const { publicacionesT } = props;

  const renderItem = ({ item }) => (
    <PublicacionCardT
      publicacion={item}
    />
  );

  return (
    <FlatList
        data={publicacionesT}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
    container: {

    }
})