import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTyes from "prop-types"

PictureModal.propTypes = {
	show: PropTyes.bool,
	handleClose: PropTyes.func,
	picture: PropTyes.string
}

export default function PictureModal({show, picture, handleClose}) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>House Picture</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img className='w-100 img img-fluid' src={picture} alt="House Picture" />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
