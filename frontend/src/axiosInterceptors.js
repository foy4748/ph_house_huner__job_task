import axios from "axios";


// Setting defaults
const client = axios.create({
	baseURL: "http://127.0.0.1:3001",
	withCredentials: true,
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	credentials: 'include',
})


client.interceptors.request.use(function (config) {
	config.headers.test = "I'm an header";
	return config;
}, null, {synchronous: true})

export default client;
