import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { Link } from "react-router";
import patientnav from "../../jsfiles/patientnav";
import Assistant from "./Assistant";
import HealthCare from "./HealthCare";
import Symptom from "./Symptom";
import Medication from "./Medication";

const HomePatient = () => {
	const [activeTab, setActiveTab] = useState("Assistant");
	return (
		<section className="h-screen mt-[8%] px-5 space-y-5">
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

			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold">Apomuden Assistant</h1>
				<button className="bg-[#ef4444] flex text-white items-center px-3 py-1 rounded-md">
					<GrEmergency />
					Emergency
				</button>
			</div>

			<div className="flex justify-between items-center bg-gray-200 py-3 px-3 ">
				{patientnav.map((item) => (
					<div
						key={item.id}
						onClick={() => setActiveTab(item.id)}
						className="flex gap-x-2 items-center cursor-pointer"
					>
						<item.icon />
						{item.text}
					</div>
				))}
			</div>

			<div>
				{activeTab === "Assistant" && <Assistant />}
				{activeTab === "HealthCare" && <HealthCare />}
				{activeTab === "Visual" && <Symptom />}
				{activeTab === "Medication" && <Medication />}
			</div>
		</section>
	);
};

export default HomePatient;
