import React, { useState } from "react";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane, FaSearch, FaPills } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import { BiBarcode } from "react-icons/bi";
import Dropdown from "../Dropdown";
import { translateText } from "../../services/translationText";

const Medication = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [medicationInfo, setMedicationInfo] = useState(null);
	const [language, setLanguage] = useState("en");
	const [isTranslating, setIsTranslating] = useState(false);

	// Fake medication database
	const medicationDatabase = {
		paracetamol: {
			name: "Paracetamol",
			uses: "Used to relieve mild to moderate pain and reduce fever.",
			dosage: "500mg every 6 to 8 hours. Maximum 4g per day.",
			instructions: "Take with water. Avoid alcohol.",
			side_effects: "Rare side effects include rash and liver damage with overdose.",
			warnings: "Do not exceed the recommended dosage. Consult a doctor if you have liver problems.",
			generic_name: "Acetaminophen",
			brand_names: "Tylenol, Panadol, Calpol"
		},
		ibuprofen: {
			name: "Ibuprofen",
			uses: "Anti-inflammatory drug used to reduce pain, fever, and inflammation.",
			dosage: "200-400mg every 4-6 hours. Maximum 1.2g per day.",
			instructions: "Take with food or milk to reduce stomach irritation.",
			side_effects: "May cause stomach upset, dizziness, or headache.",
			warnings: "Avoid if you have stomach ulcers or kidney problems.",
			generic_name: "Ibuprofen",
			brand_names: "Advil, Motrin, Nurofen"
		},
		amoxicillin: {
			name: "Amoxicillin",
			uses: "Antibiotic used to treat bacterial infections.",
			dosage: "250-500mg every 8 hours for 7-10 days.",
			instructions: "Take with or without food. Complete the full course.",
			side_effects: "May cause nausea, diarrhea, or allergic reactions.",
			warnings: "Tell your doctor if you're allergic to penicillin.",
			generic_name: "Amoxicillin",
			brand_names: "Amoxil, Trimox"
		},
		aspirin: {
			name: "Aspirin",
			uses: "Used to reduce pain, fever, inflammation, and prevent blood clots.",
			dosage: "75-100mg daily for prevention, 300-600mg for pain relief.",
			instructions: "Take with food to reduce stomach irritation.",
			side_effects: "May cause stomach bleeding, ringing in ears.",
			warnings: "Not suitable for children under 16. Avoid if you have bleeding disorders.",
			generic_name: "Acetylsalicylic Acid",
			brand_names: "Bayer, Disprin"
		}
	};

	// Handle language change from dropdown
	const handleLanguageChange = async (selectedLang) => {
		setLanguage(selectedLang.code);
		
		// Re-translate current medication info if it exists
		if (medicationInfo && selectedLang.code !== "en") {
			setIsTranslating(true);
			try {
				const translatedInfo = await translateMedicationInfo(medicationInfo, selectedLang.code);
				setMedicationInfo(translatedInfo);
			} catch (error) {
				console.error("Translation failed:", error);
			} finally {
				setIsTranslating(false);
			}
		} else if (medicationInfo && selectedLang.code === "en") {
			// Reset to original English if switching back to English
			const originalMed = medicationDatabase[searchQuery.toLowerCase()];
			if (originalMed) {
				setMedicationInfo(originalMed);
			}
		}
	};

	// Translate medication information
	const translateMedicationInfo = async (medInfo, targetLang) => {
		const translatedInfo = { ...medInfo };
		
		try {
			translatedInfo.uses = await translateText(medInfo.uses, targetLang);
			translatedInfo.dosage = await translateText(medInfo.dosage, targetLang);
			translatedInfo.instructions = await translateText(medInfo.instructions, targetLang);
			translatedInfo.side_effects = await translateText(medInfo.side_effects, targetLang);
			translatedInfo.warnings = await translateText(medInfo.warnings, targetLang);
		} catch (error) {
			console.error("Translation error:", error);
		}
		
		return translatedInfo;
	};

	// Handle search
	const handleSearch = async (e) => {
		e.preventDefault();
		
		if (!searchQuery.trim()) return;
		
		setIsSearching(true);
		
		// Simulate API delay
		setTimeout(async () => {
			const medication = medicationDatabase[searchQuery.toLowerCase()];
			
			if (medication) {
				let finalMedInfo = medication;
				
				// Translate if not English
				if (language !== "en") {
					setIsTranslating(true);
					try {
						finalMedInfo = await translateMedicationInfo(medication, language);
					} catch (error) {
						console.error("Translation failed:", error);
						finalMedInfo = medication; // Fallback to English
					} finally {
						setIsTranslating(false);
					}
				}
				
				setMedicationInfo(finalMedInfo);
			} else {
				// Show "not found" message
				const notFoundMsg = {
					name: searchQuery,
					error: "Medication not found in database. Please check the spelling or try another medication.",
					suggestion: "Available medications: Paracetamol, Ibuprofen, Amoxicillin, Aspirin"
				};
				
				if (language !== "en") {
					setIsTranslating(true);
					try {
						notFoundMsg.error = await translateText(notFoundMsg.error, language);
						notFoundMsg.suggestion = await translateText(notFoundMsg.suggestion, language);
					} catch (error) {
						console.error("Translation failed:", error);
					} finally {
						setIsTranslating(false);
					}
				}
				
				setMedicationInfo(notFoundMsg);
			}
			
			setIsSearching(false);
		}, 1000 + Math.random() * 1000); // 1-2 second delay
	};

	return (
		<div className="max-w-4xl mx-auto">
			<section className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
				{/* Header */}
				<div className="flex justify-between items-start mb-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
							<FaPills className="text-blue-500" />
							Medication Information
						</h1>
						<p className="text-gray-600 text-sm mt-1">
							Get comprehensive information about your medications and prescriptions
						</p>
					</div>
					<div>
						<Dropdown onLanguagechange={handleLanguageChange} />
					</div>
				</div>

				{/* Search Section */}
				<form onSubmit={handleSearch} className="mb-6">
					<div className="flex gap-3 items-center">
						<div className="flex-1 relative">
							<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Enter medication name (e.g., Paracetamol, Ibuprofen)..."
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<button
							type="button"
							className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
							title="Scan Barcode"
						>
							<BiBarcode size={20} />
						</button>
						<button
							type="submit"
							disabled={!searchQuery.trim() || isSearching}
							className={`px-6 py-3 rounded-lg font-medium transition-colors ${
								!searchQuery.trim() || isSearching
									? 'bg-gray-300 cursor-not-allowed text-gray-500'
									: 'bg-blue-500 hover:bg-blue-600 text-white'
							}`}
						>
							{isSearching ? 'Searching...' : 'Search'}
						</button>
					</div>
				</form>

				{/* Results Section */}
				<div className="min-h-[400px]">
					{!medicationInfo && !isSearching && (
						<div className="text-center py-16 text-gray-500">
							<FaPills size={48} className="mx-auto mb-4 text-gray-300" />
							<h3 className="text-lg font-medium mb-2">Search for Medication Information</h3>
							<p className="text-sm">Enter a medication name above to get detailed information</p>
							<p className="text-xs mt-2 text-gray-400">
								Try: Paracetamol, Ibuprofen, Amoxicillin, or Aspirin
							</p>
						</div>
					)}

					{isSearching && (
						<div className="text-center py-16">
							<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
							<p className="text-gray-500">Searching medication database...</p>
						</div>
					)}

					{medicationInfo && medicationInfo.error ? (
						<div className="bg-red-50 border border-red-200 rounded-lg p-6">
							<div className="flex items-center mb-3">
								<div className="bg-red-500 text-white rounded-full p-2 mr-3">
									<FaPills size={16} />
								</div>
								<h3 className="text-lg font-semibold text-red-800">Medication Not Found</h3>
							</div>
							<p className="text-red-700 mb-3">{isTranslating ? "Translating..." : medicationInfo.error}</p>
							<p className="text-red-600 text-sm">{isTranslating ? "Translating..." : medicationInfo.suggestion}</p>
						</div>
					) : medicationInfo && !medicationInfo.error ? (
						<div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
							{isTranslating && (
								<div className="bg-yellow-100 border border-yellow-200 rounded-md p-3 mb-4">
									<p className="text-yellow-800 text-sm">🔄 Translating medication information...</p>
								</div>
							)}
							
							{/* Medication Header */}
							<div className="flex items-center mb-6">
								<div className="bg-blue-500 text-white rounded-full p-3 mr-4">
									<FaPills size={24} />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-gray-800">{medicationInfo.name}</h2>
									{medicationInfo.generic_name && (
										<p className="text-gray-600">Generic: {medicationInfo.generic_name}</p>
									)}
									{medicationInfo.brand_names && (
										<p className="text-gray-500 text-sm">Brands: {medicationInfo.brand_names}</p>
									)}
								</div>
							</div>

							{/* Information Grid */}
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="bg-white rounded-lg p-4 border border-gray-200">
										<h3 className="font-semibold text-green-700 mb-2 flex items-center">
											<span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
											Uses
										</h3>
										<p className="text-gray-700 text-sm leading-relaxed">{medicationInfo.uses}</p>
									</div>

									<div className="bg-white rounded-lg p-4 border border-gray-200">
										<h3 className="font-semibold text-blue-700 mb-2 flex items-center">
											<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
											Dosage
										</h3>
										<p className="text-gray-700 text-sm leading-relaxed">{medicationInfo.dosage}</p>
									</div>

									<div className="bg-white rounded-lg p-4 border border-gray-200">
										<h3 className="font-semibold text-purple-700 mb-2 flex items-center">
											<span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
											Instructions
										</h3>
										<p className="text-gray-700 text-sm leading-relaxed">{medicationInfo.instructions}</p>
									</div>
								</div>

								<div className="space-y-4">
									<div className="bg-white rounded-lg p-4 border border-orange-200">
										<h3 className="font-semibold text-orange-700 mb-2 flex items-center">
											<span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
											Side Effects
										</h3>
										<p className="text-gray-700 text-sm leading-relaxed">{medicationInfo.side_effects}</p>
									</div>

									<div className="bg-white rounded-lg p-4 border border-red-200">
										<h3 className="font-semibold text-red-700 mb-2 flex items-center">
											<span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
											⚠️ Warnings
										</h3>
										<p className="text-gray-700 text-sm leading-relaxed">{medicationInfo.warnings}</p>
									</div>

									<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
										<p className="text-yellow-800 text-xs">
											<strong>Disclaimer:</strong> This information is for educational purposes only. 
											Always consult with a healthcare professional before taking any medication.
										</p>
									</div>
								</div>
							</div>
						</div>
					): null}
				</div>
			</section>
		</div>
				
	);
};

export default Medication;