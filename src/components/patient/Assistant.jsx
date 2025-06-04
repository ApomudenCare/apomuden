import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { CiMicrophoneOn } from "react-icons/ci";
import { GiSpeaker } from "react-icons/gi";
import { FaRegPaperPlane } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { translateText } from "../../services/translationText";

const Assistant = () => {
	const [displayText, setDisplayText] = useState("What is your name");
	const [language, setLanguage] = useState("en");
	const [isTranslating, setIsTranslating] = useState(false);
	const [userInput, setUserInput] = useState(""); // New: Store textarea input
	const [originalText, setOriginalText] = useState("What is your name"); // New: Store the original English text

	// Initial translation when language changes
	useEffect(() => {
		const runTranslation = async () => {
			if (language === "en") {
				setDisplayText(originalText);
			} else {
				setIsTranslating(true);
				try {
					const translated = await translateText(originalText, language);
					setDisplayText(translated);
				} catch (error) {
					console.error("Translation failed:", error);
					setDisplayText(originalText);
				} finally {
					setIsTranslating(false);
				}
			}
		};

		runTranslation();
	}, [language, originalText]); // Added originalText as dependency

	// Handle language change from dropdown
	const handleLanguageChange = (selectedLang) => {
		console.log("Selected language from dropdown:", selectedLang);
		setLanguage(selectedLang.code);
	};

	// New: Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		if (!userInput.trim()) return; // Don't submit empty messages

		// Update the original text with user input
		setOriginalText(userInput);

		// Translate immediately if not English
		if (language === "en") {
			setDisplayText(userInput);
		} else {
			setIsTranslating(true);
			try {
				const translated = await translateText(userInput, language);
				setDisplayText(translated);
			} catch (error) {
				console.error("Translation failed:", error);
				setDisplayText(userInput);
			} finally {
				setIsTranslating(false);
			}
		}

		// Clear the input field
		setUserInput("");
	};

	// New: Handle textarea change
	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};

	return (
		<section className="border border-gray-300 rounded-md p-5">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-semibold">Chat with Apomuden Assistant</h1>
					<p className="text-gray-500 text-sm">
						Describe your symptoms or ask questions about your health
					</p>
				</div>
				<div>
					<Dropdown onLanguagechange={handleLanguageChange} />
				</div>
			</div>

			{/* chat bot area */}
			<div className="ring-1 ring-gray-200 rounded-md mt-5 pb-[10%] pt-5 px-5 mb-10 space-y-6">
				<div className="flex gap-x-4 items-center">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
						<p></p>
					</div>

					<div className="flex-1 space-y-3">
						<p className="bg-[#f4f4f5] text-zinc-700 p-3 rounded-md w-md">
							{isTranslating ? "Translating..." : displayText}
						</p>
						<div className="flex gap-x-2 items-center">
							<p className="text-gray-400 text-sm">Current language: {language}</p>
							<GiSpeaker size={20} />
						</div>
					</div>
				</div>
			</div>

			{/* Interactive text message area */}
			<form onSubmit={handleSubmit} className="flex gap-x-5">
				<textarea
					value={userInput}
					onChange={handleInputChange}
					placeholder="Type your message here..."
					className="w-full border border-gray-300 rounded-md p-4 flex-1 outline-none resize-none"
					rows="3"
				/>

				<div className="w-12 flex flex-col space-y-3">
					<div className="p-3 flex justify-center items-center rounded-md cursor-pointer">
						<CiMicrophoneOn size={25} />
					</div>
					<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
						<GiSpeaker size={20} />
					</div>
					<button
						type="submit"
						disabled={!userInput.trim() || isTranslating}
						className={`p-3 flex justify-center items-center rounded-md cursor-pointer ${
							!userInput.trim() || isTranslating
								? "bg-gray-300 cursor-not-allowed"
								: "bg-[#86dbbf] hover:bg-[#8dc9b5] text-white"
						}`}
					>
						<FaRegPaperPlane size={20} />
					</button>
				</div>
			</form>
		</section>
	);
};

export default Assistant;
