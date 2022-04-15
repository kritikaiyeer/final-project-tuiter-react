/**
 * @file A file that offers various services to communicate with tuits related
 * endpoints and resources
 */
import axios from "axios";
const baseUrl=process.env.REACT_APP_BASE_URL
const USERS_API = `${baseUrl}/api/users`;
const TUITS_API = `${baseUrl}/api/tuits`;
const api = axios.create({
    withCredentials: true
});
export const findAllBoardsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/boards`)
        .then(response => response.data);
