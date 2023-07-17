import axios from "axios";


// Setting defaults
const client = axios.create({
	baseURL: "http://127.0.0.1:3001",
})


client.interceptors.request.use(function (config) {
	config.headers.test = "I'm an header";
	return config;
}, null, {synchronous: true})

export default client;
