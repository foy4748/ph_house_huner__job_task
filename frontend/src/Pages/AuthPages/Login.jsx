import {useFormik} from 'formik';
import client from '../../axiosInterceptors';
import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {writeToLocalStorage, getExpiresDateByMinutes} from '../../Utilites';
import {useSignIn} from 'react-auth-kit'

export default function Login() {
	const signIn = useSignIn();

	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const res = await client.post("/auth/login", values)
			console.log(res.data.token)

			const date = new Date();
			const time_milliseconds = date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
			writeToLocalStorage("token", res.data.token)
			signIn({
				token: res.data.token,
				expiresIn: getExpiresDateByMinutes(time_milliseconds),
				tokenType: "Bearer",
				authState: res.data.authUserState
			})
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
