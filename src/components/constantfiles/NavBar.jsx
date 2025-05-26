import React from "react";
import navigation from "../../jsfiles/navindex";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import Dropdown from "../Dropdown";
import Mode from "../Mode";
import { Link } from "react-router";

const NavBar = () => {
	return (
		<section className="border border-b-gray-300 p-4 flex justify-between items-center fixed top-0 right-0 left-0 bg-white/60 shadow-md backdrop-blur-md z-50">
			<div className="flex gap-10 items-center">
				<div className="text-[#3f9669] font-semibold">ApomudenCare</div>
				<ul className="flex items-center gap-5">
					{navigation.map((navitems, index) => (
						<Link
							to={navitems.path}
							key={index}
							className="flex items-center gap-1 hover:text-[#3f9669] hover:bg-gray-100 p-2 cursor-pointer text-gray-600"
						>
							<navitems.icon />
							{navitems.name}
						</Link>
					))}
				</ul>
			</div>
			<div className="flex gap-5 items-center">
				<Dropdown />
				<div className="items-center flex border border-gray-300 px-2 py-1 rounded-md">
					<p>
						<Mode />
					</p>
				</div>
				<button className="bg-red-500 text-white px-3 py-1 rounded-md">Emergency</button>
				<p>KA</p>
			</div>
		</section>
	);
};

export default NavBar;
