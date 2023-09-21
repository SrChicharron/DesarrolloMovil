import axios from 'axios';

// const API_URL= 'https://cleanhomeapi.ashymeadow-04120cb0.westus2.azurecontainerapps.io/ch/auth/getUsuario'
const API_URL = 'http://clenhometm.trafficmanager.net:2813/ch/auth';

// FUNCIÓN PARA OBTENER LOS DATOS DE UN USUARIO
export const getUsuario = async (userName) => {
    console.log('getUsuario');
    try {
        const response = await axios.get(`${API_URL}/getUsuario/${userName}`);
        console.log("Esto lo trae de CuentaAPI " + JSON.stringify(response.data, null, 4));
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//FUNCIÓN PARA EDITAR UN USUARIO
export const updateUsuario = async (usuario, username, token) => {
    console.log(
        'ENTRÓ A EDITAR USUARIO - editUsuario ==> ' +
            JSON.stringify(usuario, null, 4) +
            ' - ' +
            username
    );
    try {
        const response = await axios.put(
            `${API_URL}/editarInfoUser/${username}`,
            usuario,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                        'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(
            'Desde editUsuario ---> ' + JSON.stringify(response, null, 4)
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// export const updateUsuario = async (usuario, username, token) => {
//     console.log("ENTRÓ A EDITAR USUARIO - editUsuario ==> " + JSON.stringify(usuario, null, 4) + " - " + username)
//     console.log("URL: " + `${API_URL}/editarInfoUser/${username}`)
//     try {
//         axios ({
//             method: 'PUT',
//             url: `${API_URL}/editarInfoUser/${username}`,
//             data: usuario,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers":
//                 "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
//                 "Content-Type": "application/json",
//             }
//         }).then((response) => {
//             console.log("Desde editUsuario ---> " + response.data);
//             return response.data;
//         }).catch((error) => {
//             console.log(error);
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
