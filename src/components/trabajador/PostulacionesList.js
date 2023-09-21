import { FlatList } from 'react-native'
import React from 'react'
import CardPostulaciones from './CardPostulaciones'

export default function PublicacionesList( props ) {
    const { postulaciones, activeOpacity, openModal,  } = props;
    
    const renderItem = ( { item } ) => (
        <CardPostulaciones 
            postulacion={item}
            activeOpacity={activeOpacity}
            openModal={(postulacion) => openModal(postulacion)}
        />
    )

  return (
    <FlatList
        data={postulaciones}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
    />
  )
}