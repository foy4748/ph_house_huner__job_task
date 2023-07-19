import {useQuery} from "@tanstack/react-query";
import {readLocalStorage} from '../../Utilites';
import client from "../../axiosInterceptors";

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
	console.log(allBookings)
	return (
		<h1>Hello Renter</h1>
	)
}
