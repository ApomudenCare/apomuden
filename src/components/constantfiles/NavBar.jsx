import React, { useState } from "react";
import navigation from "../../jsfiles/navindex";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import Mode from "../Mode";
import { NavLink } from "react-router"; // Fix: Use "react-router-dom" instead of "react-router"
import { Menu, X } from "lucide-react";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Fixed Header (always visible) */}
			<section className="border-b border-gray-300 p-4 fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md z-50">
				<div className="flex justify-between items-center">
					<div className="text-[#3f9669] font-semibold">ApomudenCare</div>

					{/* Desktop Navigation */}
					<ul className="hidden md:flex gap-x-5 items-center">
						{navigation.map((navitems, index) => (
							<NavLink
								to={navitems.path}
								key={index}
								className={({ isActive }) =>
									`flex items-center gap-1 hover:text-[#3f9669] hover:bg-gray-100 px-4 py-1 cursor-pointer ${
										isActive ? "text-[#3f9669] bg-gray-100 rounded-md" : "text-gray-600"
									}`
								}
							>
								<navitems.icon />
								{navitems.name}
							</NavLink>
						))}
						<div className="flex gap-5 items-center">
							<div className="flex items-center border border-gray-300 px-2 py-1 rounded-md">
								<Mode />
							</div>
							<button className="bg-[#Ef5257] text-white px-3 py-2 rounded-md">Emergency</button>
							<p>KA</p>
						</div>
					</ul>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden">
						{isOpen ? (
							<X size={24} onClick={() => setIsOpen(false)} />
						) : (
							<Menu size={24} onClick={() => setIsOpen(true)} />
						)}
					</div>
				</div>
			</section>

			{/* Mobile Menu (conditionally rendered) */}
			{isOpen && (
				<div className="fixed top-16 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-md z-40 overflow-y-auto pt-4">
					<ul className="space-y-4 px-4">
						{navigation.map((navitems, index) => (
							<NavLink
								to={navitems.path}
								key={index}
								onClick={() => setIsOpen(false)} // Close menu on click
								className={({ isActive }) =>
									`flex items-center gap-2 hover:text-[#3f9669] hover:bg-gray-100 px-4 py-2 rounded-md ${
										isActive ? "text-[#3f9669] bg-gray-100" : "text-gray-600"
									}`
								}
							>
								<navitems.icon size={20} />
								{navitems.name}
							</NavLink>
						))}
						<div className="mt-6 space-y-4 px-4">
							<div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
								<Mode />
							</div>
							<button className="w-full bg-[#Ef5257] text-white px-4 py-2 rounded-md">
								Emergency
							</button>
						</div>
					</ul>
				</div>
			)}
		</>
	);
};

export default NavBar;
