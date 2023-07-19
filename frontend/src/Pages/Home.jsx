import {useQuery} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {NavLink} from "react-router-dom";
import client from "../axiosInterceptors";
import {readLocalStorage} from "../Utilites";

export default function Home() {
	// Handling Home Data
	const {
		data: allHouses,
		status,
		refetch,
	} = useQuery({
		queryKey: ['all_houses'],
		queryFn: async () => {
			const url = '/house';
			const {data} = await client.get(url);
			return data;
		},
	});

	const handleBook = async (house_id) => {
		try {
			const user_id = readLocalStorage('user_id')
			const {data: res} = await client.post("/booking", {user_id, house_id})
			if (res.error) {
				toast.error(res.message)
				return;
			}
			toast.success("Successfully booked the house");
		} catch (error) {
			console.error(error.response.data.message)
			toast.error(error.response.data.message)
			toast("Please, Login as a Renter")
		}
	}

	return (
		<section>
			<section>
				<h1>Welcome to House Hunter</h1>
				<NavLink to="/register">Register</NavLink>
				<NavLink to="/login">Login</NavLink>
			</section>
			<section className="d-grid-system">
				{allHouses && allHouses.length && allHouses.map(({_id, name, city, address}) => {
					return (
						<div key={_id} className="gs-3">
							<h1>{name}</h1>
							<p>{city}</p>
							<p>{address}</p>
							<button onClick={() => handleBook(_id)}>Book</button>
						</div>
					)
				})}
			</section>
		</section>
	)
}
