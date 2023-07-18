import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

import Home from "../Pages/Home";

// Auth Pages
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";

const routerObj = [{
	path: "/",
	element: <MainLayout />,
	children: [
		{
			path: "/",
			element: <Home />
		},
		// Auth Pages
		{
			path: "/login",
			element: <Login />
		},
		{
			path: "/register",
			element: <Register />
		},

	]
}]

const router = createBrowserRouter(routerObj)

export default router;
