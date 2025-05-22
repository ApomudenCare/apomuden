import React from "react";
import { BiArrowBack } from "react-icons/bi";
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
		</section>
	);
};

export default HomePatient;
