import axios from 'axios'
const API_URL= 'http://clenhometm.trafficmanager.net:2813/ch'
//const API_URL= 'http://192.168.0.109:2813/ch'
export const registrarUsuario = async (formData, ine) => {

    return axios({
      method: "POST",
      url: API_URL + "/auth/register",
      data: JSON.stringify(formData),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      validateStatus: (status) => {
        return status === 200 || status === 400;
      }
    })
    .then(async response => {
      let respuesta = response;  
      console.log(ine);
      if (ine !== null && response.status === 200) {
        console.log("ingresa")
        const idUsr = response.data.id;
        const ineResponse = await subirIne(ine, idUsr);
        respuesta = ineResponse;
      }
      return respuesta;
    })
    .catch(error => {
      console.log("error al registrar" + error);
      return Promise.reject(error);
    });
    
  }


export const subirIne = async(ine, idUsuario)=>{
    console.log(ine)
    console.log(idUsuario)
    const formData = new FormData();
  

        let filename = ine.split('/').pop();
        console.log(filename)
        let match = /\.(\w+)$/.exec(filename);
        console.log(match)
        let tipo = match ? `image/${match[1]}` : `image`;
        console.log(tipo)
        formData.append('ine', {uri: ine, name: filename, type:tipo });

    formData.append('idUsuario', idUsuario);
    try {
        const response = await axios.post(API_URL+'/auth/addFoto', formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "multipart/form-data",
          },
        } );
        console.log("comprobantes Upload success!", response.data);
        return(response)
    } catch (error) {
        console.error("Error uploading comprobantes:", error);
    }
    }