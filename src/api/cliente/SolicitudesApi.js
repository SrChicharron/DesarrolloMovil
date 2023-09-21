import axios from 'axios'

const API_URL= `http://clenhometm.trafficmanager.net:2813/ch/postulacion`

// FUNCIÓN PARA OBTENER LAS SOLICITUDES DE UN CLIENTE
export const getSolicitudes = async (idCliente, token) => {
    
    try {
        const response = await axios.get(`${API_URL}/getPostulacionesCliente?idCliente=${idCliente}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error desde getSolicitudes")
        console.log(error)
    }
}