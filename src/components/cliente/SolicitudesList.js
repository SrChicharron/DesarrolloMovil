import { FlatList } from 'react-native'
import React from 'react'
import SolicitudesCard from './SolicitudesCard';

export default function SolicitudesList( props ) {
  const { solicitudes, openModal, onPress } = props;

  const renderItem = ( { item } ) => (
    <SolicitudesCard
      solicitud={item}
      onPress={(solicitud, estatus) => onPress(solicitud, estatus)}
    />
  )

  return (
    <FlatList
      data={solicitudes}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem }
    />
  )
}