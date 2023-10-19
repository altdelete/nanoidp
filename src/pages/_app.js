import '../styles/globals.css';
import Layout from "@/components/Layout";
import {useEffect} from 'react';
import {useRouter} from 'next/router';

function MyApp({Component, pageProps}) {
	const router = useRouter();

	const getCookie = (name) => {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		if (match) return match[2];
	};

	useEffect(() => {
		const authCookie = getCookie('auth');
		console.log("Auth Cookie:", authCookie); // Debugging line
		if (authCookie) {
			// Redirect to dashboard if the auth cookie exists
			console.log("Redirecting to dashboard"); // Debugging line
			router.push('/dashboard');
		}
	}, []);

	return (
		<Component {...pageProps} />
	)
}

export default MyApp;
