import PropTypes from "prop-types"
import {createContext} from "react";
const userContext = createContext(null);
export {userContext};

AuthContext.propTypes = {
	children: PropTypes.any,
}

export default function AuthContext({children}) {

	const isLoggedIn = () => {

	}
	const contextPayLoad = {
		isLoggedIn
	}
	return (
		<userContext.Provider value={contextPayLoad}>
			{children}
		</userContext.Provider>
	);
}
