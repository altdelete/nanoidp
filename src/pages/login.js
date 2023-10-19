import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import Logo from "@/components/Logo";

export default function Login() {
	const router = useRouter();
	const { setUser } = useUser(); // Destructure setUser from the context

	useEffect(() => {
		const checkAuth = async () => {
			const res = await fetch('/api/user');

			if (res.status === 200) {
				router.push('/dashboard');
			}
		};

		checkAuth();
	}, []);
	const loginUser = async (event) => {
		event.preventDefault();

		const res = await fetch('/api/login', {
			body: JSON.stringify({
				email: event.target.email.value,
				password: event.target.password.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});

		const result = await res.json();

		if (res.status === 200) {
			const UserRes = await fetch('/api/user');
			const UserData = await UserRes.json();
			setUser(UserData);
			// Redirect to home page or dashboard
			await router.push('/dashboard');
		} else {
			// Login failed
			alert(`Failed to log in: ${result.message}`);
		}
	};


	return (
		<div className="flex items-center justify-center h-screen">

			<form className="bg-white p-6 rounded-lg" onSubmit={loginUser}>
				<div className="flex justify-center"><Logo size="large"/></div>
				<div className="mb-4 mt-8">
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
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
						className="w-full px-3 py-2 border rounded-md"
						placeholder="Your password"
					/>
				</div>
				<button
					type="submit"
					className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:underline"
				>
					Login
				</button>
				<button className="w-full px-3 py-2 text-white bg-blue-500 rounded-md mt-3">
					<Link href="/register" className="hover:underline">
						Register
					</Link>
				</button>
			</form>
		</div>
	);
}
