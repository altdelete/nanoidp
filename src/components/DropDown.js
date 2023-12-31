import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function DropDown() {
	const { user } = useUser();
	const router = useRouter();


	const logout = async () => {
		try {
			const res = await fetch('/api/logout', {
				method: 'POST',
				credentials: 'include', // Important
			});

			if (res.status === 200) {
				if (typeof window !== 'undefined' && router) {  // Check if on client-side and router is defined
					router.push('/login');  // Redirect to login page
				}
				} else {
				console.error('Failed to logout');
			}
		} catch (error) {
			console.error('An error occurred while logging out:', error);
		}
	};
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					{user ? user.firstName : 'Anon'}
					<ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="flex flex-col items-center space-y-2">
							<h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
								Welcome, {user ? user.firstName : 'Loading...'}
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600">
								{user ? user.email : 'Loading...'}
							</p>
							<button
								type="submit"
								onClick={logout}
								className="mx-auto px-2 py-1 text-white bg-blue-500 rounded-md max-w-xs"
							>
								Logout
							</button>
						</div>
					<div className="py-4">
						{/* Existing Menu Items */}
						{/*<Menu.Item>*/}
						{/*	{({ active }) => (*/}
						{/*		<a*/}
						{/*			href="#"*/}
						{/*			className={classNames(*/}
						{/*				active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
						{/*				'block px-4 py-2 text-sm'*/}
						{/*			)}*/}
						{/*		>*/}
						{/*			Account settings*/}
						{/*		</a>*/}
						{/*	)}*/}
						{/*</Menu.Item>*/}
						{/*<Menu.Item>*/}
						{/*	{({ active }) => (*/}
						{/*		<a*/}
						{/*			href="#"*/}
						{/*			className={classNames(*/}
						{/*				active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
						{/*				'block px-4 py-2 text-sm'*/}
						{/*			)}*/}
						{/*		>*/}
						{/*			Support*/}
						{/*		</a>*/}
						{/*	)}*/}
						{/*</Menu.Item>*/}
						{/*<Menu.Item>*/}
						{/*	{({ active }) => (*/}
						{/*		<a*/}
						{/*			href="#"*/}
						{/*			className={classNames(*/}
						{/*				active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
						{/*				'block px-4 py-2 text-sm'*/}
						{/*			)}*/}
						{/*		>*/}
						{/*			License*/}
						{/*		</a>*/}
						{/*	)}*/}
						{/*</Menu.Item>*/}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
