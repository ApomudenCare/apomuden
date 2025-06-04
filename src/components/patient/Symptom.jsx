import React, { useState } from "react";
import {
	Brain,
	Calendar,
	Heart,
	Stethoscope,
	Volume2,
	Check,
	User,
	Eye,
	Hand,
	Smile,
	Activity,
	Weight,
	//   CheckCircle
} from "lucide-react";
import { FaArrowLeft, FaArrowRight, FaCalendar, FaCheck, FaVolumeUp } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Symptom = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedBodyPart, setSelectedBodyPart] = useState(null);
	const [selectedSymptoms, setSelectedSymptoms] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Mock data for body parts with more comprehensive options
	const bodyParts = [
		{ id: 1, name: "Head", icon: Brain, color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
		{ id: 2, name: "Eyes", icon: Eye, color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
		{
			id: 3,
			name: "Mouth/Teeth",
			icon: Smile,
			color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
		},
		{ id: 4, name: "Chest", icon: Brain, color: "bg-green-50 border-green-200 hover:bg-green-100" },
		{ id: 5, name: "Heart", icon: Heart, color: "bg-red-50 border-red-200 hover:bg-red-100" },
		{
			id: 6,
			name: "Abdomen",
			icon: Stethoscope,
			color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
		},
		{
			id: 7,
			name: "Arms/Hands",
			icon: Hand,
			color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
		},
		{
			id: 8,
			name: "Legs/Feet",
			icon: Activity,
			color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
		},
		{ id: 9, name: "General", icon: Weight, color: "bg-gray-50 border-gray-200 hover:bg-gray-100" },
	];

	// Mock symptoms data for different body parts
	const symptomsData = {
		1: ["Headache", "Dizziness", "Migraine", "Confusion", "Memory Loss", "Seizure"],
		2: [
			"Blurred Vision",
			"Eye Pain",
			"Redness",
			"Dry Eyes",
			"Sensitivity to Light",
			"Double Vision",
		],
		3: [
			"Toothache",
			"Sore Throat",
			"Difficulty Swallowing",
			"Bad Breath",
			"Bleeding Gums",
			"Mouth Sores",
		],
		4: [
			"Chest Pain",
			"Shortness of Breath",
			"Coughing",
			"Wheezing",
			"Chest Tightness",
			"Difficulty Breathing",
		],
		5: [
			"Heart Palpitations",
			"Chest Pressure",
			"Irregular Heartbeat",
			"Fatigue",
			"Swelling",
			"Lightheadedness",
		],
		6: ["Stomach Pain", "Nausea", "Vomiting", "Diarrhea", "Constipation", "Bloating"],
		7: ["Joint Pain", "Swelling", "Stiffness", "Numbness", "Tingling", "Weakness"],
		8: ["Leg Pain", "Swelling", "Cramps", "Numbness", "Difficulty Walking", "Joint Stiffness"],
		9: ["Fever", "Fatigue", "Weight Loss", "Weight Gain", "Night Sweats", "Loss of Appetite"],
	};

	const nextSteps = [
		{ icon: Calendar, steps: "Schedule follow-up appointment if needed" },
		{ icon: Stethoscope, steps: "Monitor symptoms and keep a symptom diary" },
		{ icon: User, steps: "Prepare questions for your healthcare provider" },
	];

	const handleSpeak = (text) => {
		if ("speechSynthesis" in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = "en-US";
			speechSynthesis.speak(utterance);
		}
	};

	const handleBodyPartSelect = (bodyPart) => {
		setSelectedBodyPart(bodyPart);
		setCurrentStep(2);
	};

	const handleSymptomToggle = (symptom) => {
		const symptomWithBodyPart = `${selectedBodyPart.name}: ${symptom}`;
		setSelectedSymptoms((prev) =>
			prev.includes(symptomWithBodyPart)
				? prev.filter((s) => s !== symptomWithBodyPart)
				: [...prev, symptomWithBodyPart]
		);
	};

	const handleNext = () => {
		if (currentStep === 2 && selectedSymptoms.length > 0) {
			setCurrentStep(3);
		}
	};

	const handleBack = () => {
		if (currentStep === 2) {
			setCurrentStep(1);
			setSelectedBodyPart(null);
		} else if (currentStep === 3) {
			setCurrentStep(2);
		}
	};

	const handleSubmit = () => {
		setIsSubmitted(true);
	};

	const resetWizard = () => {
		setCurrentStep(1);
		setSelectedBodyPart(null);
		setSelectedSymptoms([]);
		setIsSubmitted(false);
	};

	const ProgressBar = () => (
		<div className="w-full bg-gray-200 rounded-full h-2 mb-8">
			<div
				className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
				style={{ width: `${(currentStep / 3) * 100}%` }}
			></div>
		</div>
	);

	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<div className="text-center mb-6">
							<IoMdCheckmarkCircleOutline className="text-green-600 text-6xl mx-auto mb-4" />
							<h1 className="text-3xl font-bold text-gray-800 mb-2">
								Symptoms Submitted Successfully!
							</h1>
							<button
								onClick={() => handleSpeak("Symptoms submitted successfully")}
								className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
							>
								<FaVolumeUp />
							</button>
						</div>

						<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
							<div className="flex items-center gap-3 mb-3">
								<FaCalendar className="text-blue-600" />
								<h3 className="font-semibold text-lg text-gray-800">Priority Level: Normal</h3>
							</div>
							<p className="text-gray-600 mb-3">
								Your symptoms have been recorded and a healthcare professional will review them
								shortly.
							</p>
							<p className="font-semibold text-blue-800">
								Estimated Response Time: Within 24 Hours
							</p>
						</div>

						<div className="mb-6">
							<h3 className="font-semibold text-lg mb-4 text-gray-800">Selected Symptoms:</h3>
							<div className="grid gap-2">
								{selectedSymptoms.map((symptom, index) => (
									<div
										key={index}
										className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between"
									>
										<span className="text-gray-700">{symptom}</span>
										<FaCheck className="text-green-600" />
									</div>
								))}
							</div>
						</div>

						<div className="mb-8">
							<h3 className="font-semibold text-lg mb-4 text-gray-800">Next Steps:</h3>
							<div className="space-y-3">
								{nextSteps.map((item, index) => (
									<div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
										<item.icon className="text-green-600 flex-shrink-0" />
										<span className="text-gray-700">{item.steps}</span>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-4 justify-center">
							<button
								onClick={resetWizard}
								className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
							>
								Report New Symptom
							</button>
							<button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
								Go To Healthcare Chat
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-lg shadow-lg p-8">
					{/* Header */}
					<div className="mb-8">
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-3xl font-bold text-gray-800">Symptom Assessment Wizard</h1>
							<button
								onClick={() => handleSpeak("Symptom Assessment Wizard")}
								className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
							>
								<Volume2 size={20} />
							</button>
						</div>
						<p className="text-gray-600 mb-6">
							Step {currentStep} of 3:{" "}
							{currentStep === 1
								? "Select affected body part"
								: currentStep === 2
								? "Choose your symptoms"
								: "Review and submit"}
						</p>
						<ProgressBar />
					</div>

					{/* Step 1: Body Part Selection */}
					{currentStep === 1 && (
						<div>
							<div className="flex items-center gap-3 mb-6">
								<User className="text-blue-600 text-xl" />
								<h2 className="text-2xl font-semibold text-gray-800">
									Which part of your body is affected?
								</h2>
								<button
									onClick={() => handleSpeak("Which part of your body is affected?")}
									className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
								>
									<Volume2 />
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{bodyParts.map((bodyPart) => (
									<div
										key={bodyPart.id}
										onClick={() => handleBodyPartSelect(bodyPart)}
										className={`${bodyPart.color} border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 transform hover:scale-102 hover:shadow-md`}
									>
										<div className="flex items-center justify-between mb-3">
											<bodyPart.icon className="text-2xl text-gray-700" />
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleSpeak(bodyPart.name);
												}}
												className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-white"
											>
												<FaVolumeUp size={16} />
											</button>
										</div>
										<h3 className="font-semibold text-lg text-gray-800">{bodyPart.name}</h3>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Step 2: Symptom Selection */}
					{currentStep === 2 && selectedBodyPart && (
						<div>
							<div className="flex items-center gap-3 mb-6">
								<selectedBodyPart.icon className="text-blue-600 text-xl" />
								<h2 className="text-2xl font-semibold text-gray-800">
									Select symptoms for {selectedBodyPart.name}
								</h2>
								<button
									onClick={() => handleSpeak(`Select symptoms for ${selectedBodyPart.name}`)}
									className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
								>
									<FaVolumeUp />
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
								{symptomsData[selectedBodyPart.id]?.map((symptom, index) => {
									const symptomWithBodyPart = `${selectedBodyPart.name}: ${symptom}`;
									const isSelected = selectedSymptoms.includes(symptomWithBodyPart);

									return (
										<div
											key={index}
											onClick={() => handleSymptomToggle(symptom)}
											className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-102 ${
												isSelected
													? "bg-blue-100 border-blue-400 shadow-md"
													: "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
											}`}
										>
											<div className="flex items-center justify-between">
												<span className="font-medium text-gray-800">{symptom}</span>
												<div className="flex items-center gap-2">
													{isSelected && <FaCheck className="text-blue-600" />}
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleSpeak(symptom);
														}}
														className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
													>
														<FaVolumeUp size={14} />
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="flex justify-between">
								<button
									onClick={handleBack}
									className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
								>
									<FaArrowLeft /> Back
								</button>
								<button
									onClick={handleNext}
									disabled={selectedSymptoms.length === 0}
									className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
								>
									Next <FaArrowRight />
								</button>
							</div>
						</div>
					)}

					{/* Step 3: Review and Submit */}
					{currentStep === 3 && (
						<div>
							<div className="flex items-center gap-3 mb-6">
								<FaCheck className="text-green-600 text-xl" />
								<h2 className="text-2xl font-semibold text-gray-800">Review Your Symptoms</h2>
								<button
									onClick={() => handleSpeak("Review your symptoms")}
									className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
								>
									<FaVolumeUp />
								</button>
							</div>

							<div className="bg-gray-50 rounded-lg p-6 mb-8">
								<h3 className="font-semibold text-lg mb-4 text-gray-800">Selected Symptoms:</h3>
								<div className="space-y-2">
									{selectedSymptoms.map((symptom, index) => (
										<div
											key={index}
											className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between"
										>
											<span className="text-gray-700">{symptom}</span>
											<div className="flex items-center gap-2">
												<FaCheck className="text-green-600" />
												<button
													onClick={() => handleSpeak(symptom)}
													className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
												>
													<FaVolumeUp size={14} />
												</button>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="flex justify-between">
								<button
									onClick={handleBack}
									className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
								>
									<FaArrowLeft /> Back
								</button>
								<button
									onClick={handleSubmit}
									className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
								>
									Submit Symptoms <FaCheck />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Symptom;
