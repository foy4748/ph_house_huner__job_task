import {Outlet} from "react-router-dom"
import {Toaster} from 'react-hot-toast';
import NavBar from "../Components/NavBar";
export default function MainLayout() {
	return (
		<main>
			<Toaster />
			<NavBar />
			<Outlet />
		</main>
	)
}
