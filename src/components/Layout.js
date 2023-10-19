// components/Layout.js
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
	return (
		<>
			<Navigation />
			<div className="flex">

				<Sidebar />
				<main className="flex-grow">{children}</main>
			</div>
		</>

	);
}