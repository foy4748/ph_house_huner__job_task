import axios from "axios";
import {readLocalStorage} from "./Utilites";
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

// Setting defaults
const client = axios.create({
	baseURL: SERVER_ADDRESS,
	withCredentials: true,
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
})


client.interceptors.request.use(function (config) {
	config.headers.authtoken = readLocalStorage("token");
	return config;
}, null, {synchronous: true})

export default client;
