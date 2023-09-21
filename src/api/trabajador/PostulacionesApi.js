import axios from 'axios'

const API_URL_PUBLICACION= 'http://clenhometm.trafficmanager.net:2813/ch/publicacion'
const API_URL= 'http://clenhometm.trafficmanager.net:2813/ch/postulacion'
const API_URL_RESENA = 'http://clenhometm.trafficmanager.net:2813/ch/resena'
const API_URL_SERVICIO= 'http://clenhometm.trafficmanager.net:2813/ch/servicio'
const API_URL_PROPIEDAD= 'http://clenhometm.trafficmanager.net:2813/ch/propiedad'

// FUNCIÓN PARA OBTENER LAS PUBLICACIONES DE UN CLIENTE
export const getPublicaciones = async (token) => {
  try {
    const response = await axios.get(`${API_URL_PUBLICACION}/getPublicaciones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//FUNCIÓN PARA UPDATE PUBLICACION
export const updatePublicacion = async (publicacion, token) => {
  console.log("publicacion en api: " + JSON.stringify(publicacion, null, 4))

  try {
    const response = await axios.post(`${API_URL_PUBLICACION}/updatePublicacion`, publicacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getPostulaciones = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/getPostulacionesEmpleado?idEmpleado=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN PARA ACTUALIZAR POSTULACIÓN
export const updatePostulacion = async (postulacion, token) => {
console.log("postulacion en api: " + JSON.stringify(postulacion, null, 4))
  try {
    const response = await axios.post(`${API_URL}/updatePostulacion`, postulacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN PARA AÑADIR UNA RESEÑA
export const addResena = async (resena, token) => {
  console.log("resena en api: " + JSON.stringify(resena, null, 4))
  try {
    const response = await axios.post(`${API_URL_RESENA}/addResena`, resena, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN PARA ADDPOSTULACION
export const addPostulacion = async (postulacion, token) => {
  try {
    const response = await axios.post(`${API_URL}/addPostulacion`, postulacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}