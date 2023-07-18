//import './App.css'
import router from './Router/router';
import {RouterProvider} from 'react-router-dom';
import {AuthProvider} from 'react-auth-kit';

import "bootstrap/dist/css/bootstrap.min.css"

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider
					authType={'localstorage'}
					authName={'_auth'}
				>
					<RouterProvider router={router} />

				</AuthProvider>
			</QueryClientProvider>
		</>
	)
}

export default App
