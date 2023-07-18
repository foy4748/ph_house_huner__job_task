import {useEffect, useState} from 'react'
//import './App.css'
import client from './axiosInterceptors';
import router from './Router/router';
import {RouterProvider} from 'react-router-dom';
import {AuthProvider} from 'react-auth-kit';

function App() {

	useEffect(() => {
		const fetchAPI = async () => {
			const {data} = await client.get("/")
			console.log(data)

			const payload = {
				full_name: "Faisal Rahman",
				email: "faisaljfcl@gmail.com",
				phone_number: "01717111236",
				password: "kjdfll;adsf",
				role: "owner"

			}
			//const {data: resData} = await client.post("/", payload)
			//console.log(resData)
			const {data: testCookie} = await client.get("/test");
			console.log(testCookie)
		}
		fetchAPI()
	}, [])

	return (
		<>
			<AuthProvider
				authType={'localstorage'}
				authName={'_auth'}
			>
				<RouterProvider router={router} /></AuthProvider>
		</>
	)
}

export default App
