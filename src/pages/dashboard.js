import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserAttributes from '@/components/UserAttributes';
import Layout from "@/components/Layout";
import UserTable from "@/components/UserTable";
import Stats from "@/components/Stats";
import AddUserModal from "@/components/AddUserModal";


const Dashboard = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}

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
			<Stats />
			<div className="flex-grow min-h-screen flex justify-center bg-gray-50 py-4 px-4 ">
				<div className="max-w-5xl w-full space-y-4 ">
					<div className="divide-y divide-gray-200 overflow-hidden rounded-md bg-[#F5F5F5] border w-full">
						<div className="flex justify-between px-4 py-2 sm:px-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
							<div>
								<button
									onClick={toggleModal}
									className="rounded bg-black text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
										 className="w-6 h-6">
										<path fillRule="evenodd"
											  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
											  clipRule="evenodd"/>
									</svg>
								</button>
								<button
									onClick={toggleModal}
									className="rounded bg-black text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
										 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6"/>
									</svg>


								</button>
							</div>
						</div>

						<UserTable />
						{isModalOpen && <AddUserModal open={isModalOpen} setOpen={setIsModalOpen} />}
					</div>
				</div>
			</div>
		</Layout>

	);
};

export default Dashboard;