import React from "react";
import navigation from "../../jsfiles/navindex";
import { BiGlobeAlt, BiWorld } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import { FaInternetExplorer } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";

const NavBar = () => {
	return (
		<section className="border border-b-gray-300 p-4 flex justify-between items-center ">
			<div className="flex gap-10 items-center">
				<div>Apomuden Care</div>
				<ul className="flex items-center gap-5">
					{navigation.map((navitems, index) => (
						<li key={index} className="flex items-center gap-2">
							<navitems.icon />
							{navitems.name}
						</li>
					))}
				</ul>
			</div>
			<div className="flex gap-5">
				<div className="border border-gray-200 flex items-center px-3 py-1 gap-2 rounded-md">
					<CiGlobe />
					<p>English</p>
				</div>
				<div className="items-center flex"> 
					<p>
						<TiWeatherSunny />
					</p>
				</div>
				<button>Emergency</button>
				<p>KA</p>
			</div>
		</section>
	);
};

export default NavBar;
