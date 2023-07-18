import {useFormik, Field, FormikProvider} from 'formik';

export default function Register() {
	const formik = useFormik({
		initialValues: {
			full_name: "",
			role: 'renter',
			phone_number: "",
			email: "",
			password: ""

		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="full_name">Full Name</label>
				<input
					id="full_name"
					name="full_name"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.full_name}
				/>
				<label htmlFor="role">Register As</label>
				<Field
					component="select"
					id="role"
					name="role"
				>
					<option value="renter">Renter</option>
					<option value="owner">Owner</option>
				</Field>
				<label htmlFor="phone_number">Phone Number</label>
				<input
					id="phone_number"
					name="phone_number"
					type="tel"
					onChange={formik.handleChange}
					value={formik.values.phone_number}
				/>
				<label htmlFor="email">Email Address</label>
				<input
					id="email"
					name="email"
					type="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>

				<button type="submit">Submit</button>
			</form>
		</FormikProvider>
	);
}

