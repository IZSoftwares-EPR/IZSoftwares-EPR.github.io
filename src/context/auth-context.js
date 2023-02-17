import React from 'react';
export const AuthContext = React.createContext("auth")
export const authState = {
  user: null
}
export function setUser(user){
    authState.user = user
}
export function setUserVerified(state){
    authState.user.isVerified = state;
}
export function logoutUser(){
  authState.user = null
}