import React from "react";
import footerlinks from "../../jsfiles/footerlinks";

const Footer = () => {
	return (
		<footer className="bg-[#f9fafb] border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
				{/* Main Footer Content */}
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-6 sm:mb-8">
					{/* Brand Section */}
					<div className="flex-shrink-0 text-center lg:text-left">
						<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3f9669] mb-2">
							ApomudenCare
						</h1>
						<p className="text-sm sm:text-base text-gray-600 max-w-xs">
							Speak Health in your own language
						</p>
					</div>
					
					{/* Footer Links */}
					<div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 md:gap-8">
						{footerlinks.map((item, index) => (
							<div key={index} className="flex-shrink-0">
								<a 
									href={item.link || "#"} 
									className="text-sm sm:text-base text-gray-600 hover:text-[#3f9669] transition-colors duration-200 font-medium cursor-pointer"
								>
									{item.name}
								</a>
							</div>
						))}
					</div>
				</div>
				
				{/* Divider */}
				<div className="border-t border-gray-200 pt-6 sm:pt-8">
					{/* Copyright */}
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
							&copy; {new Date().getFullYear()} Apomuden. All rights reserved
						</p>
						
						{/* Additional Links (Optional) */}
						<div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
							<a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#3f9669] transition-colors duration-200">
								Privacy Policy
							</a>
							<a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#3f9669] transition-colors duration-200">
								Terms of Service
							</a>
							<a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-[#3f9669] transition-colors duration-200">
								Contact
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;