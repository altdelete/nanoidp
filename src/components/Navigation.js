import {Fragment} from 'react'
import {Menu, Popover, Transition} from '@headlessui/react'
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {navigation} from "@/data/navData";
import DropDown from "@/components/DropDown";

const user = {
	name: 'Chelsea Hagon',
	email: 'chelsea.hagon@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
	{name: 'Your Profile', href: '#'},
	{name: 'Settings', href: '#'},
	{name: 'Sign out', href: '#'},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
	return (
		<>
			{/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
			<Popover
				as="header"
				className={({open}) =>
					classNames(
						open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
						'bg-white shadow-sm lg:static lg:overflow-y-visible'
					)
				}
			>
				{({open}) => (
					<>
						<div className="mx-auto px-4 sm:px-6 lg:px-8 border-b-2">
							<div className="relative flex items-center justify-between xl:grid xl:grid-cols-12">
								<div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
									<div className="flex flex-shrink-0 items-center">
										<a href="#">
											<img
												className="h-8 w-auto"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
												alt="Your Company"
											/>
										</a>
									</div>
								</div>
								<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
									<div
										className="flex justify-center items-center px-6 py-4 md:mx-auto xl:max-w-full lg:mx-0 lg:max-w-none xl:px-0">
										<div className="w-full mx-auto">
											<label htmlFor="search" className="sr-only">
												Search
											</label>
											<div className="relative">
												<div
													className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
													<MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
																		 aria-hidden="true"/>
												</div>
												<input
													id="search"
													name="search"
													className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
													placeholder="Search"
													type="search"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="hidden lg:flex justify-end items-center xl:col-span-2">
									<DropDown />
								</div>
								<div className="flex items-center lg:hidden">
									<Popover.Button
										className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="absolute -inset-0.5"/>
										<span className="sr-only">Open menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
										)}
									</Popover.Button>
								</div>
							</div>
						</div>

						<Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
							<div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
											'block rounded-md py-2 px-3 text-base font-medium'
										)}
									>
										{item.name}
									</a>
								))}
								<div className="flex justify-center items-center p-4">
						<span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
							<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						</span>
								</div>
							</div>
						</Popover.Panel>
					</>
				)}
			</Popover>
		</>
	)
}
