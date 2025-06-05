
import React from "react";
import keyfeatures from "../../jsfiles/features";
import { motion } from "framer-motion";

const Features = () => {
	// Animation variants for staggered animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { 
			opacity: 0, 
			y: 30,
			scale: 0.9
		},
		visible: { 
			opacity: 1, 
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut"
			}
		}
	};

	return (
		<section className="bg-gradient-to-br from-[#f9fafb] to-[#f1f5f9] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<motion.div 
					className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 md:mb-20"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
						Key Features
					</h1>
					<p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#71717a] max-w-2xl mx-auto leading-relaxed px-4">
						Our platform bridges the communication gap in healthcare with these powerful features
					</p>
				</motion.div>

				{/* Features Grid */}
				<motion.div 
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					{keyfeatures.map((item, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ 
								scale: 1.03,
								y: -8,
								transition: { duration: 0.3 }
							}}
							whileTap={{ scale: 0.98 }}
							className="group"
						>
							<div className="bg-white border border-gray-200 hover:border-[#3f9669]/30 p-6 sm:p-8 flex flex-col items-center justify-center space-y-3 sm:space-y-4 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer h-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px] relative overflow-hidden">
								{/* Subtle background pattern */}
								<div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								
								{/* Icon with background */}
								<div className="relative z-10 p-3 sm:p-4 bg-[#3f9669]/10 rounded-full group-hover:bg-[#3f9669]/15 transition-colors duration-300">
									<item.icon 
										size={window.innerWidth < 640 ? 24 : window.innerWidth < 768 ? 28 : 32} 
										className="text-[#3f9669] group-hover:scale-110 transition-transform duration-300" 
									/>
								</div>
								
								{/* Feature Title */}
								<h3 className="relative z-10 font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 text-center leading-tight">
									{item.feature}
								</h3>
								
								{/* Feature Description */}
								<p className="relative z-10 text-center text-xs sm:text-sm md:text-base text-[#71717a] leading-relaxed max-w-xs">
									{item.text}
								</p>

								{/* Hover indicator */}
								<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3f9669] to-[#2d7a56] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Optional: Call-to-action section */}
				<motion.div 
					className="text-center mt-12 sm:mt-16 md:mt-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 max-w-2xl mx-auto shadow-lg">
						<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
							Ready to Transform Healthcare Communication?
						</h3>
						<p className="text-sm sm:text-base text-[#71717a] mb-4 sm:mb-6">
							Experience seamless multilingual healthcare interactions today
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
							<button className="bg-[#3f9669] hover:bg-[#2d7a56] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
								Get Started
							</button>
							<button className="border border-[#3f9669] text-[#3f9669] hover:bg-[#3f9669] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
								Learn More
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
