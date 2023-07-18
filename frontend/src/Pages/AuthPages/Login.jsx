import {useFormik} from 'formik';
import client from '../../axiosInterceptors';
import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {writeToLocalStorage} from '../../Utilites';

export default function Login() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const res = await client.post("/auth/login", values)
			console.log(res.data.token)
			writeToLocalStorage("token", res.data.token)
			navigate("/")
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
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
	);
}
