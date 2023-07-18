import {useState} from 'react';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table"

import client from "../../axiosInterceptors";
import {useQuery} from "@tanstack/react-query";
import {readLocalStorage} from '../../Utilites';

import CreateHouseModal from '../../Components/CreateHouseModal';

import toast, {Toaster} from 'react-hot-toast';
import PictureModal from '../../Components/PictureModal';

export default function Owner() {
	const navigate = useNavigate();

	// Handling Form Modal State
	const [show1, setShow1] = useState(false);

	const handleClose1 = () => setShow1(false);
	const handleShow1 = () => setShow1(true);

	// Setting Current Picture
	const [pic, setPic] = useState()

	// Handling Pic Modal State
	const [showPic, setPicModal] = useState(false);
	const handlePicShow = () => setPicModal(true);
	const handlePicClose = () => setPicModal(false)


	// Switching between Edit mode
	const [isEdit, setIsEdit] = useState(false)
	const [editId, setEditId] = useState()


	// Handling Owner Dashboard Data
	const user_id = readLocalStorage("user_id");
	const {
		data: allHouses,
		status,
		refetch,
	} = useQuery({
		queryKey: [user_id],
		queryFn: async () => {
			const url = `/house/owner/${user_id}`;
			const {data} = await client.get(url);
			return data;
		},
	});

	// Handling Form Submit
	const formik = useFormik({
		initialValues: {
			name: "",
			address: "",
			city: "",
			bedrooms: "",
			bathrooms: "",
			phone_number: "",
			room_size: "",
			picture: "",
			rent_per_month: "",
			description: ""
		},
		onSubmit: async (values) => {
			console.log(values);
			if (!isEdit) {

				const {data} = await client.post("/house", values);
				refetch();
				console.log(data)
			} else {
				const {data} = await client.put(`/house/${editId}`, values);
				refetch();
				console.log(data)

			}
			formik.resetForm();
			handleClose1();
			navigate("/dashboard/owner", {replace: true})
		}
	})


	// Handle Edit
	const handleEdit = async (id) => {
		const {data} = await client.get(`/house/${id}`)
		// Setting Edit Mode true
		setIsEdit(true);

		// Setting Previous Data in Form
		formik.setValues(data)
		handleShow1();

		//Setting the edit Id
		// in State
		setEditId(id)
	}
	// Handle Delete
	const handleDelete = async (id) => {
		console.log(id)
		const {data} = await client.delete(`/house/${id}`);
		if (!data.error) {
			toast.success("Deleted a house")
			refetch()
		} else {

			toast.error("FAILED to delete a house")
		}
	}


	return (
		<>
			{/**/}
			<Button variant="primary" onClick={handleShow1}>
				Add a New House
			</Button>

			<CreateHouseModal show={show1} handleClose={handleClose1} formik={formik} />
			<PictureModal show={showPic} handleClose={handlePicClose} picture={pic} />
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Address</th>
						<th>City</th>
						<th>Bedrooms</th>
						<th>Bathrooms</th>
						<th>Picture</th>
						<th>Phone Number</th>
						<th>Room Size</th>
						<th>Rent Per Month</th>
					</tr>
				</thead>
				<tbody>
					{allHouses && allHouses.length > 0 && allHouses.map(({_id, name, address, city, bedrooms, bathrooms, phone_number, room_size, rent_per_month, picture}, idx) => {

						return (

							<tr key={_id}>
								<td>{idx + 1}</td>
								<td>{name}</td>
								<td>{address}</td>
								<td>{city}</td>
								<td>{bedrooms}</td>
								<td>{bathrooms}</td>
								<td onClick={() => {
									setPic(picture)
									handlePicShow();
								}}>Picture</td>
								<td>{phone_number}</td>
								<td>{room_size}</td>
								<td>{rent_per_month}</td>
								<td onClick={() => handleDelete(_id)}>Delete</td>
								<td onClick={() => handleEdit(_id)}>Edit</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</>

	)
}

