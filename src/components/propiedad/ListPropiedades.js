import { ScrollView } from 'react-native'
import React from 'react'
import CardPropiedades from '../CardPropiedades';

export default function ListPropiedades({ propiedades,propiedadEdicion, setPropiedadEdicion, openModalOptions, setModalOptionVisible, closeModalOptions }) {
    return (
        <ScrollView>
          {propiedades.map(propiedad => (
            <CardPropiedades
              key={propiedad.id}
              propiedadData={propiedad}
              propiedadEdicion={propiedadEdicion}
              setPropiedadEdicion={setPropiedadEdicion}
              onLongPress={openModalOptions}
              setModalOptionVisible={setModalOptionVisible}
              closeModalOptions={closeModalOptions}
            />
          ))}
        </ScrollView>
      );
}