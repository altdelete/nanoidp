import React, { useEffect, useState } from 'react';

export default function Stats() {
	const [totalUsers, setTotalUsers] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/getUsers');
			const data = await res.json();
			setTotalUsers(data.length);
		};
		fetchData();
	}, []);

	return (
		<div className="flex-grow flex justify-center bg-gray-50 py-4 px-4 ">
			<div className="max-w-5xl w-full space-y-4 ">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Total Users Box */}
					<div className="divide-y divide-gray-200 overflow-hidden rounded-md bg-[#F5F5F5] border w-full">
						<div className="px-4 py-2 sm:px-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">Total Users</h3>
						</div>
						<div className="px-4 py-5 sm:p-6 bg-white">
							<p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{totalUsers}</p>
						</div>
					</div>
					{/* Total Groups Box */}
					<div className="divide-y divide-gray-200 overflow-hidden rounded-md bg-[#F5F5F5] border w-full">
						<div className="px-4 py-2 sm:px-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">Total Groups</h3>
						</div>
						<div className="px-4 py-5 sm:p-6 bg-white">
							<p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">11,270.00</p>
						</div>
					</div>
					{/* Total Applications Box */}
					<div className="divide-y divide-gray-200 overflow-hidden rounded-md bg-[#F5F5F5] border w-full">
						<div className="px-4 py-2 sm:px-6">
							<h3 className="text-base font-semibold leading-7 text-gray-900">Total Devices</h3>
						</div>
						<div className="px-4 py-5 sm:p-6 bg-white">
							<p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">11</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
