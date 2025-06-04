import React from "react";
import heRo from '../../assets/images/herobg.mp4'
import { Link } from "react-router";
const Hero = () => {
	return (
		<section className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
			{/* Video Background */}
			<div className="absolute inset-0 w-full h-full">
				<video
					className="w-full h-full object-cover"
					autoPlay
					loop
					muted
					playsInline
				>
					<source
						src={heRo}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
				{/* Dark overlay for better text readability */}
				<div className="absolute inset-0"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center max-w-3xl mx-auto px-5 md:px-10">
				<div className="backdrop-blur-md bg-black/20  rounded-2xl p-8 md:p-12 space-y-6 border border-white border-opacity-20">
					<h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
						ApomudenCare
					</h1>
					<p className="text-xl md:text-2xl text-[#00ff5e] font-bold mb-6">
						Speak health in your own language
					</p>
					<p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed mb-8">
						A digital assistant for patients with speech disabilities to communicate with healthcare
						providers in local languages.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to='/patient' className="bg-[#3f9669] hover:bg-[#2d7a56] hover:scale-105 hover:shadow-xl transition-all duration-300 transform px-8 py-3 text-white rounded-lg font-medium shadow-lg">
							Patient Interface
						</Link>
						<Link to='/healthcareworker' className="bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300 transform border border-gray-200 px-8 py-3 text-gray-800 rounded-lg font-medium shadow-lg">
							Health Worker Interface
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;