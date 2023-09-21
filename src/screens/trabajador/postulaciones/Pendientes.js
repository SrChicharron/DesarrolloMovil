import {
    View,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SinSolicitudes from "../../../components/SinSolicitudes";
import PostulacionesList from "../../../components/trabajador/PostulacionesList";

export default function Pendientes( { postulaciones } ) {
    const navigation = useNavigation();
    const [postulacionesPendientes, setPostulacionesPendientes] = useState([]);

    useEffect(() => {
        setPostulacionesPendientes(filterPostulacionesPendientes());
    }, [postulaciones]);
    
    // FUNCIÓN PARA FILTRAR LAS PUBLICACIONES PENDIENTES
    const filterPostulacionesPendientes = () => {
        return postulaciones.filter(postulacion => postulacion.estatus === 'pendiente');
    }
    

    return (
        <View style={styles.container}>
            {!postulacionesPendientes || postulacionesPendientes.length === 0 && (
                <SinSolicitudes
                    mensajeTitulo='No tienes postulaciones... ¡por ahora!'
                    mensajeDescripcion='Busca y elije el mejor trabajo para tí'
                    txtBtn="Empezar a buscar"
                    onPressBtn={() => navigation.navigate("Publicaciones")}
                />
            )}
            {/* <CardPostulaciones activeOpacity={1} onLongPress={null} isAceppted={null} formData={formData} /> */}

            <PostulacionesList postulaciones={postulacionesPendientes} activeOpacity={1} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
    },
});