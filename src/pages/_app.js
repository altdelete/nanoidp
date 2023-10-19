import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserProvider } from '../contexts/UserContext';  // Import the UserProvider

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [user, setUser] = useState(null);

	const getCookie = (name) => {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		if (match) return match[2];
	};

	useEffect(() => {
		const authCookie = getCookie('auth');
		if (authCookie) {
			// Fetch user data and set it
			fetch('/api/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',  // Important for cookies to be sent
			})
				.then((res) => res.json())
				.then((userData) => {
					setUser(userData);
				})
				.catch((error) => {
					console.error('An error occurred while fetching user data:', error);
				});

			router.push('/dashboard');
		}
	}, []);

	return (
		<UserProvider value={{ user, setUser }}>
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
