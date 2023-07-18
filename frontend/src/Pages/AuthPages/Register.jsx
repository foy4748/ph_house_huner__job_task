import {useFormik, Field, FormikProvider, Form} from 'formik';
import client from '../../axiosInterceptors';
import {NavLink} from 'react-router-dom';

export default function Register() {
	// Handling Form Submit and Initial Values
	const formik = useFormik({
		initialValues: {
			full_name: "",
			role: 'renter',
			phone_number: "",
			email: "",
			password: ""

		},

		// Handling POSTing data
		onSubmit: async (values) => {
			const res = await client.post("/auth/register", values)
			const date = new Date();
			date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
			if (res.data.error) {
				alert("Registered Failed")
				return;
			}
		}
	});
	return (
		<section>
			<NavLink to="/login">Login</NavLink>
			<FormikProvider value={formik}>
				<form onSubmit={(e) => {
					e.preventDefault();
					formik.handleSubmit(e)
				}}>
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
		</section>
	);
}

