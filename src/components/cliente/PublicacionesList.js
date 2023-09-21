import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import PublicacionCard from '../CardPublicaciones';

export default function PublicacionesList( props ) {
  const { publicaciones, openModalOptions, openModalResenia } = props;

  const renderItem = ({ item }) => (
    <PublicacionCard
      publicacion={item}
      openModalOptions={(publicacion) => openModalOptions(publicacion)}
      openModalResenia={(publicacion) => openModalResenia(publicacion)}
    />
  );

  return (
    <FlatList
        data={publicaciones}
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