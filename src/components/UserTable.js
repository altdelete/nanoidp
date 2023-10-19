import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function UserTable() {
	const [users, setUsers] = useState([]);
	const checkbox = useRef();
	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/getUsers');
			const data = await res.json();
			setUsers(data);
		};
		fetchData();
	}, []);

	useLayoutEffect(() => {
		const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;
		setChecked(selectedUsers.length === users.length);
		setIndeterminate(isIndeterminate);
		checkbox.current.indeterminate = isIndeterminate;
	}, [selectedUsers]);

	const toggleAll = () => setSelectedUsers(checked || indeterminate ? [] : users);

	return (
		<div className="bg-white">
			{/* ... (rest of your header and buttons here) ... */}
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="relative">
							{selectedUsers.length > 0 && (
								<div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
									{/* Bulk edit and Delete all buttons here */}
								</div>
							)}
							<table className="min-w-full table-fixed divide-y divide-gray-300">
								<thead>
								<tr>
									<th className="relative pl-4">
										<input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" ref={checkbox} checked={checked} onChange={toggleAll} />
									</th>
									<th className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Full Name</th>
									<th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Username</th>
									<th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
									<th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Account Age</th>
								</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
								{users.map((user, index) => (
									<tr key={index} className={selectedUsers.includes(user) ? 'bg-gray-50' : undefined}>
										<td className="relative px-7 sm:w-12 sm:px-6">
											<input
												type="checkbox"
												className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												checked={selectedUsers.includes(user)}
												onChange={() =>
													setSelectedUsers(
														selectedUsers.includes(user)
															? selectedUsers.filter((u) => u !== user)
															: [...selectedUsers, user]
													)
												}
											/>
										</td>
										<td className="whitespace-nowrap py-4 pr-3 text-sm font-medium">{`${user.firstName} ${user.lastName}`}</td>

										<td className={classNames('whitespace-nowrap px-3 py-4 text-sm text-gray-500', selectedUsers.includes(user) ? 'text-indigo-600' : 'text-gray-500')}>{user.username}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
