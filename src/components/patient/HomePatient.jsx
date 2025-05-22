import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { Link } from "react-router";

const HomePatient = () => {
	return (
		<section className="h-screen mt-[8%] px-5">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-semibold">Patient Interface</h1>
				<Link
					to={"/"}
					className="bg-[#f9fafb] border border-gray-300 px-2 py-1 rounded-md flex items-center gap-x-2"
				>
					<BiArrowBack />
					Back to Home
				</Link>
			</div>

			<div>
				<h1>Apomuden Assistant</h1>
				<button className="bg-[#ef4444] flex text-white items-center px-3 py-1 rounded-md">
					<GrEmergency />
					Emergency
				</button>
			</div>
		</section>
	);
};

export default HomePatient;
