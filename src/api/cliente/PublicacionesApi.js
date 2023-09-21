import axios from 'axios'

const API_URL= 'http://clenhometm.trafficmanager.net:2813/ch/publicacion'
const API_URL_SERVICIO= 'http://clenhometm.trafficmanager.net:2813/ch/servicio'
const API_URL_PROPIEDAD= 'http://clenhometm.trafficmanager.net:2813/ch/propiedad'


// FUNCIÓN PARA OBTENER LAS PUBLICACIONES DE UN CLIENTE
export const getPublicaciones = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/getPublicaciones`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error desde getPublicaciones")
    console.log(error);
  }
}

// FUNCIÓN PARA EDITAR UNA PUBLICACIÓN
export const updatePublicacion = async (publicacion, token) => {
  console.log("editPublicacion ==> " + JSON.stringify(publicacion, null, 4))
  try {
    const response = await axios.post(`${API_URL}/updatePublicacion`, publicacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    // console.log("Error desde updatePublicacion")
    console.log(error);
  }
}

// FUNCIÓN PARA ELIMINAR UNA PUBLICACIÓN
export const deletePublicacion = async (publicacion, token) => {
  console.log("deletePublicacion")
  try {
    const response = await axios.post(`${API_URL}/deletePublicacion`, publicacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log("Desde deletePublicacion ---> " + response.data);
    return response.data;
  } catch (error) {
    console.log("Error desde deletePublicacion")
    console.log(error);
  }
}


// FUNCIÓN PARA OBTENER TODOS LOS SERVICIOS
export const getServicios = async (token) => {
  // console.log("getServicios")
  try {
    // Mandar token como header Authorization
    const response = await axios.get(`${API_URL_SERVICIO}/getServicios`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log("Desde getServicios ---> " + response.data);
    return response.data;
  } catch (error) {
    console.log("Error desde getServicios")
    console.log(error);
  }
}


// FUNCIÓN PARA OBTENER TODAS LAS PROPIEDADES
export const getPropiedades = async (auth) => {
  // console.log("getPropiedades")
  try {
    // Mandar token como header Authorization
    // console.log(JSON.stringify(auth, null, 4))
    const response = await axios.get(`${API_URL_PROPIEDAD}/getPropiedades?idCliente=${auth.idUsuario}`, {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      }
    });
    // console.log("Desde getPropiedades ---> " + JSON.stringify(response.data, null, 4));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


// FUNCIÓN PARA DAR DE ALTA UNA PUBLICACIÓN
export const addPublicacion = async (publicacion, token) => {
  console.log("addPublicacion")
  try {
    // Mandar token como header Authorization
    const response = await axios.post(`${API_URL}/addPublicacion`, publicacion, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log("Desde addPublicacion ---> " + response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}