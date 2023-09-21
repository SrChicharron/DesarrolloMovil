import {
    View,
    StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SinSolicitudes from "../../../components/SinSolicitudes";
import PostulacionesList from "../../../components/trabajador/PostulacionesList";

export default function Finalizados( { postulaciones } ) {
    const navigation = useNavigation();
    const [postulacionesFinalizadas, setPostulacionesFinalizadas] = useState([]);

    useEffect(() => {
        setPostulacionesFinalizadas(filterPostulacionesFinalizadas());
    }, [postulaciones])

    // FUNCIÓN PARA FILTRAR LAS POSTULACIONES FINALIZADAS
    const filterPostulacionesFinalizadas = () => {
        return postulaciones.filter(postulacion => postulacion.estatus === 'finalizada');
    }

    return (
        <View style={styles.container} >
            {!postulacionesFinalizadas || postulacionesFinalizadas.length === 0 && (
                <SinSolicitudes
                    mensajeTitulo='No tienes trabajos terminados'
                    mensajeDescripcion='Espera a que un empleador de por finalizado tu trabajo. Mientras, puedes seguir buscando'
                    txtBtn="Empezar a buscar"
                    onPressBtn={() => navigation.navigate("Publicaciones")}
                />
            )}
            {/* <CardPostulaciones activeOpacity={1} onLongPress={null} isAceppted={null} formData={formData} /> */}

            <PostulacionesList postulaciones={postulacionesFinalizadas} activeOpacity={1} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
    },
});