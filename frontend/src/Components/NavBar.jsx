import {NavLink, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import toast from "react-hot-toast"
import {readLocalStorage, writeToLocalStorage} from '../Utilites';
import {useContext, useRef, useState} from 'react';
import {useEffect} from 'react';
import {userContext} from '../Contexts/AuthContext';

export default function NavBar() {
	const navigate = useNavigate()
	const handleDashboard = () => {
		const role = readLocalStorage('role')
		console.log(role)
		if (role == "owner") {
			navigate("/dashboard/owner", {replace: true})
		}
		if (role == "renter") {
			navigate("/dashboard/renter", {replace: true})

		}
		if (!role) {
			toast.error("Please Login")
			navigate("/login", {replace: true})
		}
	}
	const NavItems = () => {
		const {loggedIn, setLoggedIn} = useContext(userContext)

		const handleLogOut = () => {
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('user_id')
			setLoggedIn(false)
			toast.success("Logged Out Successfully")
		}
		if (!loggedIn) {
			return (
				<>
					<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
					<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
				</>
			)
		} else {
			return <Nav.Link as={NavLink} to="/" onClick={handleLogOut}>Log Out</Nav.Link>

		}

	}
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={NavLink} to="/">House Hunter</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link onClick={handleDashboard}>Dashboard</Nav.Link>
					</Nav>
					<Nav className="me-auto">
						<NavItems />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

