import PropTypes from "prop-types"
import {createContext, useEffect, useState} from "react";
import {readLocalStorage} from "../Utilites";
const userContext = createContext(null);

export {userContext};

AuthContext.propTypes = {
	children: PropTypes.any,
}

export default function AuthContext({children}) {

	const [loggedIn, setLoggedIn] = useState(false)
	useEffect(() => {
		const token = readLocalStorage('token')
		if (token) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false)
		}
		console.log(loggedIn)
	}, [])
	const contextPayLoad = {
		loggedIn, setLoggedIn
	}
	return (
		<userContext.Provider value={contextPayLoad}>
			{children}
		</userContext.Provider>
	);
}
