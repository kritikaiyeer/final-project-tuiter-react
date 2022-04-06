/**
 * @file A file that offers various services to communicate with users related
 * endpoints and resources
 */
import axios from "axios";
//const BASE_URL = "https://fse-node-app-a4.herokuapp.com";
 const BASE_URL = process.env.REACT_APP_BASE_URL;

const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) =>
    axios.post(`${USERS_API}`, user)
        .then(response => response.data);

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
    axios.delete(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    axios.get(`${USERS_API}/username/${username}/delete`)
        .then(response => response.data);


const service = {
    findAllUsers
}

export default service;