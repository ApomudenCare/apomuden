import React, { useState } from "react";
import navigation from "../../jsfiles/navindex";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import Mode from "../Mode";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Close mobile menu when clicking on a nav link
	const handleNavClick = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Fixed Header (always visible) */}
			<section className="border-b border-gray-300 p-3 sm:p-4 fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md z-50">
				<div className="flex justify-between items-center max-w-7xl mx-auto">
					{/* Logo - responsive text size */}
					<div className="text-[#3f9669] font-semibold text-lg sm:text-xl lg:text-2xl">
						ApomudenCare
					</div>

					{/* Desktop Navigation */}
					<ul className="hidden lg:flex items-center gap-x-3 xl:gap-x-5">
						{navigation.map((navitems, index) => (
							<NavLink
								to={navitems.path}
								key={index}
								className={({ isActive }) =>
									`flex items-center gap-1 hover:text-[#3f9669] hover:bg-gray-100 px-3 py-2 cursor-pointer rounded-md transition-colors duration-200 text-sm xl:text-base ${
										isActive ? "text-[#3f9669] bg-gray-100" : "text-gray-600"
									}`
								}
							>
								<navitems.icon className="text-lg" />
								<span className="hidden xl:inline">{navitems.name}</span>
							</NavLink>
						))}

						{/* Desktop Actions */}
						<div className="flex gap-2 xl:gap-3 items-center ml-4">
							{/* Mode Toggle */}
							<div className="flex items-center border border-gray-300 px-2 py-1 rounded-md">
								<Mode />
							</div>

							{/* Emergency Button - responsive sizing */}
							<Link
								to="/emergency"
								className="bg-[#ef5257] hover:bg-[#d44449] text-white px-2 py-1 xl:px-3 xl:py-2 rounded-md text-sm xl:text-base transition-colors duration-200"
							>
								Emergency
							</Link>

							{/* User Initial */}
							<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
								KA
							</div>
						</div>
					</ul>

					{/* Mobile/Tablet Menu Button */}
					<div className="lg:hidden">
						{isOpen ? (
							<X
								size={24}
								onClick={() => setIsOpen(false)}
								className="cursor-pointer hover:text-[#3f9669] transition-colors duration-200"
							/>
						) : (
							<Menu
								size={24}
								onClick={() => setIsOpen(true)}
								className="cursor-pointer hover:text-[#3f9669] transition-colors duration-200"
							/>
						)}
					</div>
				</div>
			</section>

			{/* Mobile/Tablet Navigation Menu - Full Height with Backdrop Blur */}
			{isOpen && (
				<div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-md z-40">
					{/* Navigation Items Container */}
					<div className="pt-20 pb-6 px-4 h-full overflow-y-auto">
						<ul className="space-y-3 mb-6">
							{navigation.map((navitems, index) => (
								<NavLink
									to={navitems.path}
									key={index}
									onClick={handleNavClick}
									className={({ isActive }) =>
										`flex items-center gap-3 hover:text-[#3f9669] hover:bg-white/50 px-4 py-3 cursor-pointer rounded-md transition-colors duration-200 ${
											isActive ? "text-[#3f9669] bg-white/50" : "text-gray-600"
										}`
									}
								>
									<navitems.icon className="text-xl" />
									<span className="text-base">{navitems.name}</span>
								</NavLink>
							))}
						</ul>

						{/* Mobile Actions */}
						<div className="space-y-4">
							{/* Mode Toggle */}
							<div className="flex items-center border border-gray-300 px-3 py-2 rounded-md w-fit bg-white/50">
								<Mode />
							</div>

							{/* Emergency Button */}
							<Link
								to="/emergency"
								onClick={handleNavClick}
								className="bg-[#ef5257] hover:bg-[#d44449] text-white px-4 py-3 rounded-md w-full text-base font-medium transition-colors duration-200 block text-center"
							>
								Emergency
							</Link>

							{/* User Section */}
							<div className="flex items-center gap-3 pt-2">
								<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-base font-medium">
									KA
								</div>
								<span className="text-gray-600">User Profile</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
