
import React from "react";
import { Link } from "react-router";

const CTA = () => {
	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 max-w-4xl mx-auto">
				{/* Heading */}
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center leading-tight mb-3 sm:mb-4">
					Ready to Get Started?
				</h1>
				
				{/* Description */}
				<p className="text-[#71717a] text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-2xl leading-relaxed mb-6 sm:mb-8">
					Join us in bridging the communication gap in healthcare
				</p>
				
				{/* Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
					<Link to='/patient' className="bg-[#3f9669] hover:bg-[#2d7a56] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium transition-colors duration-200 text-sm sm:text-base shadow-md hover:shadow-lg">
						Patient Interface
					</Link >
					<Link to='/healthcareworker'className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg">
						Healthcare Worker
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CTA;

