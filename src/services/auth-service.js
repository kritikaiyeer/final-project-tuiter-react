/**
 * @file A file that offers various services to communicate with authentication related
 * endpoints and resources
 */
import axios from "axios";
//const BASE_URL = "https://fse-node-app-a4.herokuapp.com";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const SECURITY_API = `${REACT_APP_BASE_URL}/api/auth`;

const api = axios.create({
   withCredentials: true
});

export const googleLogin = (user) =>
    api.post(`${SECURITY_API}/googleLogin`, user)
        .then(response => response.data);

export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${SECURITY_API}/login`, user)
        .then(response => response.data);

export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);

