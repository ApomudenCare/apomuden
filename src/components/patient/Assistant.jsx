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
	const [userInput, setUserInput] = useState("");
	const [originalText, setOriginalText] = useState("What is your name");

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
	}, [language, originalText]);

	const handleLanguageChange = (selectedLang) => {
		setLanguage(selectedLang.code);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!userInput.trim()) return;

		setOriginalText(userInput);

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

		setUserInput("");
	};

	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};

	return (
		<section className="border border-gray-300 rounded-md p-4 md:p-6 lg:p-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-xl md:text-2xl font-semibold">Chat with Apomuden Assistant</h1>
					<p className="text-gray-500 text-sm">
						Describe your symptoms or ask questions about your health
					</p>
				</div>
				<div>
					<Dropdown onLanguagechange={handleLanguageChange} />
				</div>
			</div>

			{/* Chat area */}
			<div className="ring-1 ring-gray-200 rounded-md mt-6 mb-8 p-4 md:p-6 space-y-4 min-h-[120px]">
				<div className="flex items-start gap-x-4">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
						<p className="font-bold text-lg text-gray-600">A</p>
					</div>
					<div className="flex-1 space-y-3">
						<p className="bg-gray-100 text-gray-800 p-3 rounded-md break-words">
							{isTranslating ? "Translating..." : displayText}
						</p>
						<div className="flex items-center gap-x-2 text-gray-400 text-sm">
							<p>Language: {language}</p>
							<GiSpeaker size={18} />
						</div>
					</div>
				</div>
			</div>

			{/* Message input area */}
			<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
				<textarea
					value={userInput}
					onChange={handleInputChange}
					placeholder="Type your message here..."
					className="w-full border border-gray-300 rounded-md p-3 resize-none outline-none min-h-[100px]"
					rows="3"
				/>

				<div className="flex md:flex-col gap-3 justify-between md:justify-start">
					<button
						type="button"
						className="p-3 bg-gray-100 hover:bg-gray-200 rounded-md flex justify-center items-center"
					>
						<CiMicrophoneOn size={22} />
					</button>

					<button
						type="button"
						className="p-3 bg-gray-100 hover:bg-gray-200 rounded-md flex justify-center items-center"
					>
						<GiSpeaker size={20} />
					</button>

					<button
						type="submit"
						disabled={!userInput.trim() || isTranslating}
						className={`p-3 rounded-md flex justify-center items-center transition-colors ${
							!userInput.trim() || isTranslating
								? "bg-gray-300 cursor-not-allowed"
								: "bg-green-400 hover:bg-green-500 text-white"
						}`}
					>
						<FaRegPaperPlane size={18} />
					</button>
				</div>
			</form>
		</section>
	);
};

export default Assistant;
