import React, { useState, createContext } from 'react'
import axios from 'axios';

export const AuthContext = createContext({
  auth: undefined
});

export function AuthProvider(props) {
  const { children } = props
  const [auth, setAuth] = useState(undefined)

  const login = (loginData) => {
    const urlLogin = 'http://clenhometm.trafficmanager.net:2813/ch/auth/signin'

    axios({
      method: "POST",
      url: urlLogin,
      data: JSON.stringify(loginData),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      },
    }).then(response => {
      setAuth(response.data);
    }).catch(error => {
      console.log(error);
    })
  };
  const logout = () => {
    setAuth(undefined)
  }
  const valueContext = {
    auth,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  )
}