import Link from 'next/link';
import { IdentificationIcon} from "@heroicons/react/24/solid";

const Logo = ({ size }) => {
	const iconSize = size === 'large' ? 'h-16 w-16' : 'h-10 w-10';
	const textSize = size === 'large' ? 'text-2xl' : 'text-xl';
	return (
		<div className="flex flex-shrink-0 md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2 min-w-[100px]">
			<div className="flex  items-center">
				<Link href="#">
					<div className="flex items-center"> {/* This div is added to make the icon and h2 side by side */}
						<IdentificationIcon className={`${iconSize} text-black`}/>
						<h2 className={`ml-2 ${textSize} font-extrabold text-gray-900`}>NanoIdP</h2>

					</div>
				</Link>
			</div>
		</div>
	)
}

export default Logo;