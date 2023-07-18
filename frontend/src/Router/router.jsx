import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

import Home from "../Pages/Home";

// Auth Pages
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import Owner from "../Pages/Dashboards/Owner";
import Renter from "../Pages/Dashboards/Renter";

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
		// Dashboard Pages
		{
			path: "/dashboard/owner",
			element: <Owner />
		},
		{
			path: "/dashboard/renter",
			element: <Renter />
		},

	]
}]

const router = createBrowserRouter(routerObj)

export default router;
