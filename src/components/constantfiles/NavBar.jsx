
import React, { useState } from "react";
import navigation from "../../jsfiles/navindex";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import Mode from "../Mode";

import { NavLink } from "react-router"; // Fix: Use "react-router-dom" instead of "react-router"

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

		<section
			className={`border-b border-gray-300 p-3 sm:p-4 items-center fixed top-0 right-0 left-0 bg-white/60 backdrop-blur-md z-50 transition-all duration-300 ${
				isOpen ? "h-screen" : "h-auto"
			}`}
		>
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
									isActive 
										? "text-[#3f9669] bg-gray-100" 
										: "text-gray-600"
								}`
							}
						>
							<navitems.icon className="text-lg" />
							<span className="hidden xl:inline">{navitems.name}</span>
						</NavLink>
					))}
					
					{/* Desktop Actions */}
					<div className="flex gap-2 xl:gap-3 items-center ml-4">
						{/* Language/Globe - hidden on smaller desktop screens */}
						{/* <div className="hidden xl:flex">
							<Dropdown onLanguagechange={(lang) => console.log("Selected", lang)} />
						</div> */}
						
						{/* Mode Toggle */}
						{/* <div className="flex items-center border border-gray-300 px-2 py-1 rounded-md">
							<Mode />
						</div> */}
						
						{/* Emergency Button - responsive sizing */}
						<Link to='/emergency' className="bg-[#ef5257] hover:bg-[#d44449] text-white px-2 py-1 xl:px-3 xl:py-2 rounded-md text-sm xl:text-base transition-colors duration-200">
							Emergency
						</Link >
						
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
			</section>


			{/* Mobile Menu (conditionally rendered) */}
			{isOpen && (
				<div className="fixed top-16 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-md z-40 overflow-y-auto pt-4">
					<ul className="space-y-4 px-4">
			{/* Mobile/Tablet Navigation Menu */}
			{isOpen && (
				<div className="lg:hidden mt-6 max-w-7xl mx-auto">
					<ul className="space-y-3">

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
								onClick={handleNavClick}
								className={({ isActive }) =>
									`flex items-center gap-3 hover:text-[#3f9669] hover:bg-gray-100 px-4 py-3 cursor-pointer rounded-md transition-colors duration-200 ${
										isActive 
											? "text-[#3f9669] bg-gray-100" 
											: "text-gray-600"
									}`
								}
							>
								<navitems.icon className="text-xl" />
								<span className="text-base">{navitems.name}</span>
							</NavLink>
						))}
					</ul>
					
					{/* Mobile Actions */}
					<div className="mt-6 space-y-4 px-4 pb-6">
						{/* Language Dropdown for Mobile */}
						{/* <div className="flex items-center">
							<Dropdown />
						</div> */}
						
						{/* Mode Toggle */}
						{/* <div className="flex items-center border border-gray-300 px-3 py-2 rounded-md w-fit">
							<Mode />
						</div> */}
						
						{/* Emergency Button */}
						<Link to='/emergency' className="bg-[#ef5257] hover:bg-[#d44449] text-white px-4 py-3 rounded-md w-full text-base font-medium transition-colors duration-200">
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
			)}
		</>
	);
};

export default NavBar;
