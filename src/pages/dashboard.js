// pages/dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserAttributes from '@/components/UserAttributes';
import Layout from "@/components/Layout";

const Dashboard = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const logout = async () => {
		try {
			const res = await fetch('/api/logout', {
				method: 'POST',
				credentials: 'include', // Important
			});

			if (res.status === 200) {
				router.push('/login'); // Redirect to login page
			} else {
				console.error('Failed to logout');
			}
		} catch (error) {
			console.error('An error occurred while logging out:', error);
		}
	};

	useEffect(() => {
		// Fetch user data
		const fetchData = async () => {
			try {
				const res = await fetch('/api/user', {
					method: 'GET',
					credentials: 'include',  // Important
				});

				if (res.status === 200) {
					const userData = await res.json();
					setUser(userData);
				} else {
					console.error('Failed to fetch user');
					router.push('/login');
				}
			} catch (error) {
				console.error('An error occurred while fetching user data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Layout>
			<div className="flex-grow min-h-screen flex justify-center bg-gray-50 py-4 px-4 ">
				<div className="max-w-5xl w-full space-y-4 ">
					{/*<div className="flex flex-col items-center space-y-2">*/}
					{/*	<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">*/}
					{/*		Welcome, {user ? user.firstName : 'Loading...'}*/}
					{/*	</h2>*/}
					{/*	<p className="mt-2 text-center text-sm text-gray-600">*/}
					{/*		Email: {user ? user.email : 'Loading...'}*/}
					{/*	</p>*/}
					{/*	<button*/}
					{/*		type="submit"*/}
					{/*		onClick={logout}*/}
					{/*		className="mx-auto px-2 py-1 text-white bg-blue-500 rounded-md max-w-xs"*/}
					{/*	>*/}
					{/*		Logout*/}
					{/*	</button>*/}
					{/*</div>*/}
					<div className="divide-y divide-gray-200 overflow-hidden rounded-md bg-[#F5F5F5] border w-full">
						<div className="px-4 py-2 sm:px-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
						</div>
						<div className="px-4 py-5 sm:p-6 bg-white">
							<UserAttributes user={user} />
						</div>
					</div>
				</div>
			</div>
		</Layout>

	);
};

export default Dashboard;