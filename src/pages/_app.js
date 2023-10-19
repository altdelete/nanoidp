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

		const fetchUserData = async () => {
			try {
				const res = await fetch('/api/user', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',  // Important for cookies to be sent
				});

				if (res.status === 200) {
					const userData = await res.json();
					setUser(userData);
					console.log("User set in _app.js:", userData);
				} else {
					console.error('Failed to fetch user');
				}
			} catch (error) {
				console.error('An error occurred while fetching user data:', error);
			}
		};

		if (authCookie) {
			fetchUserData();  // Call the async function
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
