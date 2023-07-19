import {useQuery} from "@tanstack/react-query";
import {useFormik} from "formik";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {NavLink, useNavigate} from "react-router-dom";
import client from "../axiosInterceptors";
import BookAHouseModal from "../Components/BookAHouseModal";
import {readLocalStorage} from "../Utilites";

import Pagination from 'react-bootstrap/Pagination';

export default function Home() {
	const [currentHouse, setCurrentHouse] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [houses, setHouse] = useState([])
	const [totalHouses, setTotalHouse] = useState(0)

	// Filters
	// filter by city, bedrooms, bathrooms, room size,
	// availability, and rent per month (using a range selector)
	const [city, setCity] = useState()
	const [bedrooms, setBedrooms] = useState()
	const [bathrooms, setBathrooms] = useState()
	const [roomSize, setRoomSize] = useState()
	const [rentLow, setRentLow] = useState(0)
	const [rentHigh, setRentHigh] = useState(0)

	const filterHouse = () => {
		setHouse(allhouses)
		if (city) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.city == city);
				return newSet
			})
		}
		if (bathrooms) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.bathrooms == bathrooms);
				return newSet
			})
		}
		if (bedrooms) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.bedrooms == bedrooms);
				return newSet
			})
		}
		if (roomSize) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.roomSize == roomSize);
				return newSet
			})
		}
		if (rentLow) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.rentLow >= rentLow);
				return newSet
			})
		}
		if (rentHigh) {
			setHouse((prev) => {
				const newSet = prev.filter((house) => house.rentHigh <= rentHigh);
				return newSet
			})
		}
	}

	//-------------------------------------
	const navigate = useNavigate();

	console.log(totalHouses)

	// Handling Home Data
	const {
		data: allhouses,
		status,
		refetch,
	} = useQuery({
		queryKey: ['all_houses', currentPage],
		queryFn: async () => {
			const url = `/house?page=${currentPage}&limit=10`;
			const {data} = await client.get(url);
			setHouse(data.houses)
			setTotalHouse(parseInt(data.totalHouses))
			return data;
		},
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone_number: ""
		},
		onSubmit: async (values) => {
			// Handling Booking Request
			const handleBook = async (house_id) => {
				try {
					const user_id = readLocalStorage('user_id')
					const {data: res} = await client.post("/booking", {user_id, house_id, ...values})
					if (res.error) {
						toast.error(res.message)
						handleCloseBookModal()
						return;
					}
					toast.success("Successfully booked the house");
					handleCloseBookModal()
				} catch (error) {
					console.error(error.response.data.message)
					handleCloseBookModal()
					toast.error(error.response.data.message)
					toast("Please, Login as a Renter")
				}
			}
			await handleBook(currentHouse)
			formik.resetForm();
			navigate('/', {replace: true})
		}
	})

	const [showBookModal, setShowBookModal] = useState(false)

	const handleShowBookModal = async () => {
		const user_id = readLocalStorage('user_id')
		const {data} = await client.get(`/auth/${user_id}`)
		const {full_name, email, phone_number} = data;
		formik.setValues({name: full_name, email, phone_number})
		setShowBookModal(true)
	}
	const handleCloseBookModal = () => setShowBookModal(false);


	const PaginationButtons = () => {
		const numberOfPages = Math.ceil(totalHouses / 10) //Limit is 10 (Hardcoded)
		const paginationItems = []
		for (let i = 0; i < numberOfPages; i++) {
			paginationItems.push(<Pagination.Item key={i} active={i == currentPage - 1} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Pagination.Item>)
		}

		return paginationItems
	}
	return (
		<section>
			<section>
				<h1>Welcome to House Hunter</h1>
				<NavLink to="/register">Register</NavLink>
				<NavLink to="/login">Login</NavLink>
				<input onChange={(e) => setBedrooms(e.target.value)} name="bedrooms" type="number" placeholder="Bedrooms" />
				<input onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" type="number" placeholder="Bathrooms" />
				<button onClick={filterHouse}>Filter</button>
			</section>
			<BookAHouseModal show={showBookModal} formik={formik} handleClose={handleCloseBookModal} />
			<div className="d-flex justify-content-center">
				<Pagination>
					<PaginationButtons />
				</Pagination>
			</div>
			<section className="d-grid-system">
				{houses && houses.length && houses.map(({_id, name, city, address, bedrooms, bathrooms}) => {
					return (
						<div key={_id} className="gs-3">
							<h1>{name}</h1>
							<p>{city}</p>
							<p>{address}</p>
							<p>beds:{bedrooms}</p>
							<p>baths: {bathrooms}</p>
							<button onClick={() => {
								handleShowBookModal()
								setCurrentHouse(_id)
							}}>Book</button>
						</div>
					)
				})}
			</section>
			<div className="d-flex justify-content-center">
				<Pagination>
					<PaginationButtons />
				</Pagination>
			</div>
		</section>
	)
}
