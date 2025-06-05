
import React, { useState, useEffect } from "react";
import heRo from '../../assets/images/herobg.mp4'
import { Link } from "react-router";

const Hero = () => {
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Check if device is mobile for video optimization
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<section className="relative pt-16 sm:pt-20 min-h-screen flex items-center justify-center overflow-hidden">
			{/* Video Background */}
			<div className="absolute inset-0 w-full h-full">
				<video
					className={`w-full h-full object-cover transition-opacity duration-1000 ${
						isVideoLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					autoPlay
					loop
					muted
					playsInline
					preload={isMobile ? "metadata" : "auto"}
					onLoadedData={() => setIsVideoLoaded(true)}
				>
					<source src={heRo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				
				{/* Fallback background color while video loads */}
				<div className={`absolute inset-0 bg-gradient-to-br from-[#3f9669] to-[#2d7a56] transition-opacity duration-1000 ${
					isVideoLoaded ? 'opacity-0' : 'opacity-100'
				}`}></div>
				
				{/* Dark overlay for better text readability */}
				<div className="absolute inset-0 bg-black/30"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
				<div className="backdrop-blur-md bg-black/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-6 border border-white/20 shadow-2xl">
					{/* Main Heading - Highly Responsive */}
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
						ApomudenCare
					</h1>
					
					{/* Tagline */}
					<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00ff5e] font-bold mb-4 sm:mb-6 leading-snug">
						Speak health in your own language
					</p>
					
					{/* Description */}
					<p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
						A digital assistant for patients with speech disabilities to communicate with healthcare
						providers in local languages.
					</p>

					{/* Action Buttons - Responsive Layout */}
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
						<Link 
							to='/patient' 
							className="w-full sm:w-auto bg-[#3f9669] hover:bg-[#2d7a56] hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl transition-all duration-300 transform px-6 sm:px-8 py-3 sm:py-3.5 text-white rounded-lg font-medium shadow-lg text-sm sm:text-base active:scale-95"
						>
							Patient Interface
						</Link>
						<Link 
							to='/healthcareworker' 
							className="w-full sm:w-auto bg-white/90 hover:bg-white hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl transition-all duration-300 transform border border-white/30 px-6 sm:px-8 py-3 sm:py-3.5 text-gray-800 rounded-lg font-medium shadow-lg text-sm sm:text-base active:scale-95"
						>
							Health Worker Interface
						</Link>
					</div>

					{/* Optional: Feature highlights for larger screens */}
					<div className="hidden lg:flex justify-center items-center gap-8 mt-8 pt-6 border-t border-white/20">
						<div className="flex items-center gap-2 text-white/80">
							<div className="w-2 h-2 bg-[#00ff5e] rounded-full"></div>
							<span className="text-sm">Multi-language Support</span>
						</div>
						<div className="flex items-center gap-2 text-white/80">
							<div className="w-2 h-2 bg-[#00ff5e] rounded-full"></div>
							<span className="text-sm">Speech Recognition</span>
						</div>
						<div className="flex items-center gap-2 text-white/80">
							<div className="w-2 h-2 bg-[#00ff5e] rounded-full"></div>
							<span className="text-sm">Healthcare Focused</span>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator - Hidden on mobile */}
			<div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
