import axios from 'axios'
//import {API_URL} from '@env'
const API_URL= 'http://clenhometm.trafficmanager.net:2813/ch'
export const fetchEstados = async (token) => {
  try {
    const response = await axios.get(API_URL+"/catalogo/getEstados", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const fetchTipos = async (token) => {
    try {
      const response = await axios.get(API_URL+"/catalogo/getTipos", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  export const fetchPropiedades = async (idCliente, token) => {
    try {
      const response = await axios.get(API_URL+"/propiedad/getPropiedades?idCliente="+idCliente, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
//registro de propiedades en 3 pasos
  export const registrarPropiedad = async(formData, fotos, comprobantes, token)=>{

    axios({
      method:"POST",
      url:API_URL+"/propiedad/addPropiedad",
      data: JSON.stringify(formData),
      headers: {
        'Authorization': `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      },
  }).then(response=>{
    // console.log(response.data);
    // console.log(fotos)
    //si se envian fotos se guardan
    if(fotos.length>0){
      const uploadFotos=subirFotosPropiedad(fotos, response.data.id, token);
    }
    //se guardan comprobantes
    if(comprobantes.length>0){
      const uploadFotos=subirComprobantesPropiedad(comprobantes, response.data.id, token);
    }
    return response.data;
  }).catch(error=>{
  console.log(error);
  })
  
  }

  export const subirFotosPropiedad = async(fotos, idPropiedad, token)=>{
  const formData = new FormData();

  fotos.forEach((uri, index) => {
      let filename = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append('fotos', { uri, name: filename, type });
  });

  formData.append('idPropiedad', idPropiedad);
  try {
      const response = await axios.post(API_URL+'/propiedad/addFotos', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      } );
      console.log("Fotos Upload success!", response.data);
  } catch (error) {
      console.error("Error uploading Fotos:", error);
  }
  }

  export const subirComprobantesPropiedad = async(comprobantes, idPropiedad, token)=>{
    const formData = new FormData();
  
    comprobantes.forEach((uri, index) => {
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
  
        formData.append('comprobantes', { uri, name: filename, type });
    });
    formData.append('idPropiedad', idPropiedad);
    try {
        const response = await axios.post(API_URL+'/propiedad/addComprobantes', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        } );
        console.log("comprobantes Upload success!", response.data);
    } catch (error) {
        console.error("Error uploading comprobantes:", error);
    }
    }


    export const deletePropiedad = async(formData, token)=>{
      axios({
        method:"POST",
        url:API_URL+"/propiedad/deletePropiedad",
        data: JSON.stringify(formData),
        headers: {
          'Authorization': `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
    }).then(response=>{
      console.log(response.data);
      console.log("propiedad eliminada correctamente");
      return response.data;
    }).catch(error=>{
    console.log(error);
    })
    
    }