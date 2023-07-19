import {FormikProvider} from 'formik';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTyes from "prop-types";
BookAHouseModal.propTypes = {
	show: PropTyes.bool,
	handleClose: PropTyes.func,
	formik: PropTyes.any
}
export default function BookAHouseModal({show, handleClose, formik}) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Enter Your Informations</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FormikProvider value={formik}>
					<Form>
						<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput1">
							<Form.Label>Name</Form.Label>
							<Form.Control disabled type="text" placeholder="For Example: Shanti Villa" name="name" value={formik.values.name} />
						</Form.Group>
						<Form.Group disabled className="mb-3" controlId="houseCreateForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control disabled type="text" placeholder="For Example: Shanti Villa" name="email" value={formik.values.email} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="houseCreateForm.ControlInput5">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control type="tel" placeholder="01...." onChange={formik.handleChange} value={formik.values.phone_number} name="phone_number" />
						</Form.Group>
					</Form>
				</FormikProvider>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={formik.handleSubmit}>
					Book Now
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
