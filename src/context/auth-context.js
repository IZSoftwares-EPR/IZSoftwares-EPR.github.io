import React from 'react';
import jwt_decode from "jwt-decode"
export const AuthContext = React.createContext("auth")
function setCookie(cname, cvalue, exdays) {
  const d = new Date(exdays * 1000 - (5 * 3600));
  document.cookie = cname + "=" + cvalue + ";expires=" + d.toUTCString() + ";path=/;";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
export const authState = {
  userJWT: getCookie("erp-jwt"),
}

export function setJWT(jwt){
  authState.userJWT = jwt
  setCookie("erp-jwt", jwt, jwt_decode(jwt).exp)
}
export function logoutUser(){
  authState.userJWT = null
  setCookie("erp-jwt", "", Date.now()/1000)
}