import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { hashPassword} from "@/auth/helpers";

export default function AddUserModal({ open, setOpen }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		dateOfBirth: '',
		profilePicture: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const hashedPassword = await hashPassword(formData.password);
			const user = await createUser({ ...formData, password: hashedPassword });

		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#F9FAFB] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-lg sm:max-w-4xl">
								<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
									<div className="px-4 sm:px-0">
										<h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
										<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
									</div>

									<form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
										<div className="px-4 py-6 sm:p-8">
											<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
												<div className="sm:col-span-3">
													<label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
														First name
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="first-name"
															id="first-name"
															autoComplete="given-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-3">
													<label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
														Last name
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="last-name"
															id="last-name"
															autoComplete="family-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-4">
													<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
														Email address
													</label>
													<div className="mt-2">
														<input
															id="email"
															name="email"
															type="email"
															autoComplete="email"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-4">
													<label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
														Country
													</label>
													<div className="mt-2">
														<select
															id="country"
															name="country"
															autoComplete="country-name"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option>United States</option>
															<option>Canada</option>
															<option>Mexico</option>
														</select>
													</div>
												</div>

												<div className="col-span-full">
													<label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
														Street address
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="street-address"
															id="street-address"
															autoComplete="street-address"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-2 sm:col-start-1">
													<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
														City
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="city"
															id="city"
															autoComplete="address-level2"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-2">
													<label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
														State / Province
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="region"
															id="region"
															autoComplete="address-level1"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-2">
													<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
														ZIP / Postal code
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="postal-code"
															id="postal-code"
															autoComplete="postal-code"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
											<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
												Cancel
											</button>
											<button
												type="submit"
												className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>
												Save
											</button>
										</div>
									</form>
								</div>
								{/*<div className="mt-5 sm:mt-6">*/}
								{/*	<button*/}
								{/*		type="button"*/}
								{/*		className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
								{/*		onClick={() => setOpen(false)}*/}
								{/*	>*/}
								{/*		Go back to dashboard*/}
								{/*	</button>*/}
								{/*</div>*/}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
