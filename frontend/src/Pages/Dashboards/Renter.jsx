import {useQuery} from "@tanstack/react-query";
import {readLocalStorage} from '../../Utilites';
import client from "../../axiosInterceptors";
import {useState} from "react";

import toast from 'react-hot-toast';
import PictureModal from '../../Components/PictureModal';
import Table from "react-bootstrap/Table"

export default function Renter() {
	// Handling Owner Dashboard Data
	const user_id = readLocalStorage("user_id");
	const {
		data: allBookings,
		status,
		refetch,
	} = useQuery({
		queryKey: [user_id],
		queryFn: async () => {
			const url = "/booking";
			const {data} = await client.get(url);
			return data;
		},
	});
	// Setting Current Picture
	const [pic, setPic] = useState()

	// Handling Pic Modal State
	const [showPic, setPicModal] = useState(false);
	const handlePicShow = () => setPicModal(true);
	const handlePicClose = () => setPicModal(false)

	//  Handling Booking Delete
	const handleDelete = async (house_id) => {
		const url = `/booking/${house_id}`;
		const {data} = await client.delete(url);
		if (!data.error) {
			toast.success("Deleted a house")
			refetch()
		} else {

			toast.error("FAILED to delete a house")
		}
	}
	return (
		<>
			<h1>Hello Renter</h1>
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
					{allBookings && allBookings.length > 0 && allBookings.map(({_id, name, address, city, bedrooms, bathrooms, phone_number, room_size, rent_per_month, picture}, idx) => {

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
							</tr>
						)
					})}
				</tbody>
			</Table>

		</>
	)
}
