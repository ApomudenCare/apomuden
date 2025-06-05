import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { GrEmergency } from "react-icons/gr";
import { Link } from "react-router"; // Fixed: Use react-router-dom
import patientnav from "../../jsfiles/patientnav";
import Assistant from "./Assistant";
import HealthCare from "./HealthCare";
import Symptom from "./Symptom";
import Medication from "./Medication";

const HomePatient = () => {
	const [activeTab, setActiveTab] = useState("Assistant");

	return (
		<section className="mt-16 md:mt-24 px-4 sm:px-6 md:px-8 lg:px-12 space-y-6">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Patient Interface</h1>
				<Link
					to="/"
					className="bg-gray-50 border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
				>
					<BiArrowBack className="text-lg" />
					<span className="text-sm sm:text-base">Back to Home</span>
				</Link>
			</div>

			{/* Assistant + Emergency Button */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h2 className="text-xl sm:text-2xl font-semibold">Apomuden Assistant</h2>
				<button className="bg-red-500 hover:bg-red-600 flex items-center gap-2 text-white px-4 py-2 rounded-md transition whitespace-nowrap">
					<GrEmergency className="text-lg" />
					<span className="text-sm sm:text-base">Emergency</span>
				</button>
			</div>

			{/* Navigation Tabs */}
			<div className="overflow-x-auto scrollbar-hide">
				<div className="inline-flex min-w-full bg-gray-100 rounded-lg p-1 space-x-2">
					{patientnav.map((item) => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className={`flex items-center gap-2 px-4 py-2 rounded-md whitespace-nowrap transition ${
								activeTab === item.id
									? "bg-white text-black shadow"
									: "text-gray-600 hover:bg-gray-200"
							}`}
						>
							<item.icon className="text-base sm:text-lg" />
							<span className="text-sm sm:text-base">{item.text}</span>
						</button>
					))}
				</div>
			</div>

			{/* Tab Content */}
			<div className="w-full">
				{activeTab === "Assistant" && <Assistant />}
				{activeTab === "HealthCare" && <HealthCare />}
				{activeTab === "Visual" && <Symptom />}
				{activeTab === "Medication" && <Medication />}
			</div>
		</section>
	);
};

export default HomePatient;
