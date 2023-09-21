import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import PubEspacioscomerciales from './Home-tipolimpieza/PubEspacioscomerciales';
import PubOrganizacionyorden from './Home-tipolimpieza/PubOrganizacionyorden';
import { getPublicaciones } from "../../api/trabajador/PostulacionesApi";
import PubLimpiezaHogar from './Home-tipolimpieza/PubLimpiezaHogar';
import useAuth from "../../hooks/UseAuth";


export default function Home() {
  const { auth } = useAuth();
  const [filterOption, setFilterOption] = useState("Limpieza Hogar");
  const [publicaciones, setPublicaciones] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const token = auth.token;


  const handleFilterClick = (option) => {
    setFilterOption(option);
  };


  useEffect(() => {
    loadPublicaciones();
  }, [publicaciones]);


  const loadPublicaciones = async () => {
    const responseData = await getPublicaciones(token);
    setPublicaciones(responseData);
  };

  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }



  return (
    <View style={styles.container}>

      <View style={styles.containerFilter}>
        <ScrollView contentContainerStyle={styles.scrollContent} horizontal showsHorizontalScrollIndicator={false} >
          <TouchableOpacity
            style={[
              styles.containerTextFilter,
              filterOption === 'Limpieza Hogar' && styles.activeOptionBtnFilter,
            ]}
            onPress={() => handleFilterClick('Limpieza Hogar')}
          >
            <Text style={[styles.textFilter, filterOption === 'Limpieza Hogar' && styles.activeOptionTxtBtnFilter]}>
              Limpieza hogar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerTextFilter,
              filterOption === 'Espacios comerciales' && styles.activeOptionBtnFilter,
            ]}
            onPress={() => handleFilterClick('Espacios comerciales')}
          >
            <Text style={[styles.textFilter, filterOption === 'Espacios comerciales' && styles.activeOptionTxtBtnFilter]}>
              Espacio comercial
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerTextFilter,
              filterOption === 'Organizacion y orden' && styles.activeOptionBtnFilter,
            ]}
            onPress={() => handleFilterClick('Organizacion y orden')}
          >
            <Text style={[styles.textFilter, filterOption === 'Organizacion y orden' && styles.activeOptionTxtBtnFilter]}>
              Organización y orden
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {filterOption === "Limpieza Hogar" && (
        <PubLimpiezaHogar
          publicaciones={publicaciones}
        />
      )}
      {filterOption === "Espacios comerciales" && (
        <PubEspacioscomerciales 
        publicaciones={publicaciones}
        openModal={openModal}
           
        />

      )}
      {filterOption === "Organizacion y orden" && (
        <PubOrganizacionyorden
          publicaciones={publicaciones}
          openModal={openModal}
           


        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  containerFilter: {
    height: 60,
    marginTop: -10,
  },
  containerTextFilter: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  activeOptionBtnFilter: {
    color: '#E6E6E6',
  },
  activeOptionTxtBtnFilter: {
    color: '#075493',
    fontWeight: 'bold',
  },
  textFilter: {
    textAlign: 'center',
    color: '#707070'
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingBottom: 20,
  },
});
