import axios from "axios";
import {readLocalStorage} from "./Utilites";


// Setting defaults
const client = axios.create({
	baseURL: "http://127.0.0.1:3001",
	withCredentials: true,
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
})


client.interceptors.request.use(function (config) {
	config.headers.authtoken = readLocalStorage("token");
	return config;
}, null, {synchronous: true})

export default client;
