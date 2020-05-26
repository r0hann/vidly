import http from './httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(`${config.apiUrl}/auth`, {
    email,
    password
  });
  console.log('authService', jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // jwtDecode cannot be empty
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
