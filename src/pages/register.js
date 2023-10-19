import { useRouter } from 'next/router';

export default function Register() {
	const router = useRouter();

	const registerUser = async (event) => {
		event.preventDefault();

		const res = await fetch('/api/register', {
			body: JSON.stringify({
				firstName: event.target.firstName.value,
				lastName: event.target.lastName.value,
				email: event.target.email.value,
				password: event.target.password.value,
				phoneNumber: event.target.phoneNumber.value,
				dateOfBirth: event.target.dateOfBirth.value,
				profilePicture: event.target.profilePicture.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});

		const result = await res.json();

		if (res.status === 201) {
			// Registration successful
			alert("User registered successfully!");
			// Log the user in and redirect to dashboard
			router.push('/dashboard');
		} else {
			// Registration failed
			alert(`Failed to register: ${result.message}`);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form className="bg-white p-6 rounded-lg" onSubmit={registerUser}>
				<div className="mb-4">
					<label htmlFor="firstName" className="sr-only">
						First Name
					</label>
					<input
						id="firstName"
						type="text"
						name="firstName"
						required
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your first name"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="lastName" className="sr-only">
						Last Name
					</label>
					<input
						id="lastName"
						type="text"
						name="lastName"
						required
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your last name"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
						required
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your email"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						type="password"
						name="password"
						required
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your password"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="phoneNumber" className="sr-only">
						Phone Number
					</label>
					<input
						id="phoneNumber"
						type="text"
						name="phoneNumber"
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your phone number"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="dateOfBirth" className="sr-only">
						Date Of Birth
					</label>
					<input
						id="dateOfBirth"
						type="date"
						name="dateOfBirth"
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="profilePicture" className="sr-only">
						Profile Picture URL
					</label>
					<input
						id="profilePicture"
						type="text"
						name="profilePicture"
						className="w-full px-3 py-2 border rounded-md"
						placeholder="URL of your profile picture"
					/>
				</div>
				<button
					type="submit"
					className="w-full px-3 py-2 text-white bg-blue-500 rounded-md"
				>
					Register
				</button>
			</form>
		</div>
	);
}