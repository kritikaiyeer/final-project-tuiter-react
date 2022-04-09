/**
 * @file A file that offers various services to communicate with tuits related
 * endpoints and resources
 */
 import axios from "axios";
 const baseUrl=process.env.REACT_APP_BASE_URL
 const USERS_API = `${baseUrl}/users`;
 const TUITS_API = `${baseUrl}/tuits`;
 const api = axios.create({
    withCredentials: true
 });
 
 export const findAllUsers = () =>
     api.get(USERS_API)
         .then(response => response.data);
