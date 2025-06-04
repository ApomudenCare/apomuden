import { useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";

const Dropdown = ({ onLanguagechange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState("English");
	const languages = [
		{ label: "English", code: "en" },
		{ label: "Twi", code: "ak" },
		{ label: "Ga", code: "gaa" },
		{ label: "Ewe", code: "ewe" },
	];

	const toggleFunction = () => setIsOpen(!isOpen);

	const handleSelect = (lang) => {
		setSelectedLanguage(lang.label);
		setIsOpen(false);
		if (onLanguagechange) {
			onLanguagechange(lang); // Pass the entire lang object instead of lang.code
		}
	};

	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className="relative">
			<button
				onClick={toggleFunction}
				className="border border-gray-200 bg-[#f9fafb] px-4 py-1 rounded-md flex items-center gap-x-2"
			>
				<CiGlobe />
				{selectedLanguage}
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-2 bg-white w-30 rounded-md shadow-lg ring-1 ring-gray-200 ring-opacity-5">
					<div>
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => handleSelect(lang)}
								className="flex flex-col w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
							>
								{lang.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;