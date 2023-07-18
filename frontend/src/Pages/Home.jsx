import {NavLink} from "react-router-dom";
export default function Home() {
	return (
		<section>
			<h1>Welcome to House Hunter</h1>
			<NavLink to="/register">Register</NavLink>
			<NavLink to="/login">Login</NavLink>
		</section>
	)
}
