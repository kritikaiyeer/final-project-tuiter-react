/**
 * @file A file that offers various services to communicate with tuits related
 * endpoints and resources
 */
 import axios from "axios";
 const baseUrl=process.env.REACT_APP_BASE_URL
 const USERS_API = `${baseUrl}/api/users`;
 const TUITS_API = `${baseUrl}/tuits`;
 const api = axios.create({
    withCredentials: true
 });
 
 export const findAllUsers = () =>
     api.get(`${baseUrl}/users`)
         .then(response => response.data);

export const setPrivelageAccess = (uid,privilege) => {
    api.put(`${USERS_API}/${uid}/privilegesTrue/${privilege}`)
        .then(response => response.data)
}

export const getPrivelageAccess = () =>
    api.get(`${baseUrl}/api/privileges`)
        .then(response => response.data)

export const setPrivelageRevokeAccess = (uid,privilege) => {
    api.put(`${USERS_API}/${uid}/PrivilegesFalse/${privilege}`)
        .then(response => response.data)
}
