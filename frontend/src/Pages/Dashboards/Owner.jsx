import {useState} from 'react';
import {useFormik, FormikProvider} from 'formik';
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import client from "../../axiosInterceptors";

export default function Owner() {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const formik = useFormik({
		initialValues: {
			name: "Faisal",
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
			const {data} = await client.post("/house", values);
			console.log(data)
			navigate("/dashboard/owner")
		}
	})
	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add a New House
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Enter House Informations</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormikProvider value={formik}>
						<Form>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput1">
								<Form.Label>Name of the house</Form.Label>
								<Form.Control type="text" placeholder="For Example: Shanti Villa" onChange={formik.handleChange} name="name" value={formik.values.name} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput2">
								<Form.Label>Address</Form.Label>
								<Form.Control type="text" placeholder="Full Address" onChange={formik.handleChange} value={formik.values.address} name="address" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput2">
								<Form.Label>City</Form.Label>
								<Form.Control type="text" placeholder="City" onChange={formik.handleChange} value={formik.values.city} name="city" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput3">
								<Form.Label>Number of Bedrooms</Form.Label>
								<Form.Control type="number" onChange={formik.handleChange} value={formik.values.bedrooms} name="bedrooms" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput4">
								<Form.Label>Number of Bathrooms</Form.Label>
								<Form.Control type="number" onChange={formik.handleChange} value={formik.values.bathrooms} name="bathrooms" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput5">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control type="tel" placeholder="01...." onChange={formik.handleChange} value={formik.values.phone_number} name="phone_number" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput6">
								<Form.Label>Roome Size</Form.Label>
								<Form.Control type="text" placeholder="for example: 6 x 6 ft" onChange={formik.handleChange} value={formik.values.room_size} name="room_size" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput7">
								<Form.Label>Renter Per Month</Form.Label>
								<Form.Control type="number" onChange={formik.handleChange} value={formik.values.rent_per_month} name="rent_per_month" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput8">
								<Form.Label>Picture URL</Form.Label>
								<Form.Control type="text" placeholder="for example: https://.." onChange={formik.handleChange} value={formik.values.picture} name="picture" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="houseCreateForm.ControlTextarea1">
								<Form.Label>description</Form.Label>
								<Form.Control as="textarea" rows={3} onChange={formik.handleChange} value={formik.values.description} name="description" />
							</Form.Group>
						</Form>
					</FormikProvider>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={formik.handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>

	)
}

