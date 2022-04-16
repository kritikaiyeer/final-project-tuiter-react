/**
 * @file A file that offers various services to communicate with tuits related
 * endpoints and resources
 */
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
const USERS_API = `${baseUrl}/api/users`;
const TUITBOARD_API = `${baseUrl}/api/boards`;
const api = axios.create({
  withCredentials: true,
});
export const findAllBoardsByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/boards`).then((response) => response.data);

export const createBoard = (uid,board) =>
  api.post(`${USERS_API}/${uid}/boards/${board}`).then((response) => response.data);

export const addTuitToBoard = (bid,tid, uid) =>
  api.post(`${TUITBOARD_API}/${bid}/tuits/${tid}`, {id: uid}).then((response) => response.data);

export const findAllTuitsFromBoard = (bid) => 
  api.get(`${TUITBOARD_API}/${bid}/tuits`).then((response) => response.data);