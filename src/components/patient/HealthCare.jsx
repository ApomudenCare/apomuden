import React, { useState, useEffect } from "react";
import healthworker from "../../jsfiles/healthworker";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";
import { FiMenu, FiX, FiChevronLeft } from "react-icons/fi";

const HealthCare = () => {
	// State management
	const [selectedWorker, setSelectedWorker] = useState(healthworker[0]);
	const [messages, setMessages] = useState({
		[healthworker[0].id]: [
			{
				id: 1,
				text: "How can I help you today?",
				sender: "worker",
				timestamp: "Yesterday",
				isDateSeparator: true,
			},
			{
				id: 2,
				text: "How can I help you today?",
				sender: "worker",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			},
		],
	});
	const [currentMessage, setCurrentMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [showSidebar, setShowSidebar] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// Fake response templates
	const fakeResponses = [
		"Thank you for sharing that with me. Can you tell me more about when this started?",
		"I understand your concern. Based on what you've described, I'd recommend...",
		"That's a common issue. Let me ask a few more questions to better help you.",
		"I see. Have you experienced any other symptoms along with this?",
		"Based on your symptoms, I'd suggest monitoring this closely. If it persists...",
		"Thank you for the information. I recommend you schedule an appointment for a proper examination.",
		"That sounds concerning. Please make sure to get enough rest and stay hydrated.",
		"I appreciate you reaching out. Let's discuss some treatment options.",
	];

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setWindowWidth(width);
			setIsMobile(width < 768);
			if (width >= 768) {
				setShowSidebar(true);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Utility functions
	const statusdot = (status) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "busy":
				return "bg-yellow-500";
			default:
				return "bg-gray-400";
		}
	};

	const textColor = (status) => {
		switch (status) {
			case "online":
				return "text-green-500";
			case "busy":
				return "text-yellow-500";
			default:
				return "text-gray-400";
		}
	};

	// Handle worker selection
	const handleWorkerSelect = (worker) => {
		setSelectedWorker(worker);
		if (!messages[worker.id]) {
			setMessages((prev) => ({
				...prev,
				[worker.id]: [
					{
						id: Date.now(),
						text: `Hello! I'm ${worker.name}. How can I assist you today?`,
						sender: "worker",
						timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
					},
				],
			}));
		}
		if (isMobile) {
			setShowSidebar(false);
		}
	};

	// Handle message sending
	const handleSendMessage = async (e) => {
		e.preventDefault();

		if (!currentMessage.trim()) return;

		const newUserMessage = {
			id: Date.now(),
			text: currentMessage,
			sender: "user",
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => ({
			...prev,
			[selectedWorker.id]: [...(prev[selectedWorker.id] || []), newUserMessage],
		}));

		setCurrentMessage("");
		setIsTyping(true);

		setTimeout(() => {
			const randomResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
			const newWorkerMessage = {
				id: Date.now() + 1,
				text: randomResponse,
				sender: "worker",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			};

			setMessages((prev) => ({
				...prev,
				[selectedWorker.id]: [...(prev[selectedWorker.id] || []), newWorkerMessage],
			}));
			setIsTyping(false);
		}, 1500 + Math.random() * 2000);
	};

	const currentMessages = messages[selectedWorker.id] || [];

	return (
		<section className="border border-gray-200 rounded-md overflow-hidden h-[600px] flex flex-col">
			{/* Header */}
			<div className="px-4 py-2 border-b border-gray-200">
				<div className="flex items-center justify-between">
					{isMobile && !showSidebar && (
						<button
							onClick={() => setShowSidebar(true)}
							className="p-1 rounded-md hover:bg-gray-100"
						>
							<FiChevronLeft size={24} />
						</button>
					)}
					<h1 className="text-2xl font-semibold rounded-md">
						{isMobile && !showSidebar
							? `Chat with ${selectedWorker.name}`
							: "Chat with HealthCare Workers"}
					</h1>
					{isMobile && showSidebar && (
						<button
							onClick={() => setShowSidebar(false)}
							className="p-1 rounded-md hover:bg-gray-100 md:hidden"
						>
							<FiX size={24} />
						</button>
					)}
				</div>
				<p className="text-sm text-gray-500 mb-2">
					{isMobile && !showSidebar
						? selectedWorker.role
						: "Direct communication with doctors and healthcare professionals"}
				</p>
			</div>

			<main className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<aside
					className={`w-full md:w-1/3 border-r border-gray-200 overflow-y-auto bg-white absolute md:relative z-10 h-full transition-transform duration-300 ${
						showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
					}`}
				>
					<div className="border-b border-gray-200 px-4 py-2">
						<h1 className="text-lg font-semibold">HealthCare Workers</h1>
						<p className="text-sm text-gray-500">Select a healthworker to chat with</p>
					</div>

					{healthworker.map((worker) => (
						<div
							key={worker.id}
							onClick={() => handleWorkerSelect(worker)}
							className={`flex items-start gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-300 transition-colors ${
								selectedWorker.id === worker.id ? "bg-blue-50 border-blue-200" : ""
							}`}
						>
							<div className="relative">
								<div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center text-sm font-medium">
									{worker.initials}
								</div>
								<span
									className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusdot(
										worker.status
									)}`}
								></span>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-center">
									<p className="font-medium truncate">{worker.name}</p>
									<p className="text-xs text-gray-500">{worker.lastSeen}</p>
								</div>
								<p className="text-sm text-gray-500 truncate">{worker.role}</p>
								<p className={`${textColor(worker.status)} font-medium text-sm capitalize`}>
									{worker.status}
								</p>
							</div>
						</div>
					))}
				</aside>

				{/* Chat section */}
				<section
					className={`flex-1 flex flex-col h-full ${
						!showSidebar || !isMobile ? "block" : "hidden"
					}`}
				>
					{/* Chat header */}
					<div className="flex gap-3 p-4 border-b border-gray-300 bg-white">
						{isMobile && (
							<button
								onClick={() => setShowSidebar(true)}
								className="p-1 rounded-md hover:bg-gray-100 mr-2"
							>
								<FiMenu size={24} />
							</button>
						)}
						<div className="relative">
							<div className="bg-gray-400 w-10 h-10 rounded-full flex justify-center items-center text-white font-medium">
								{selectedWorker.initials}
							</div>
							<span
								className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusdot(
									selectedWorker.status
								)}`}
							></span>
						</div>
						<div>
							<p className="font-medium flex gap-x-2 items-center">
								{selectedWorker.name}
								<span
									className={`text-xs px-2 py-1 rounded-full ${
										selectedWorker.status === "online"
											? "text-green-900 bg-green-200"
											: selectedWorker.status === "busy"
											? "text-yellow-900 bg-yellow-200"
											: "text-gray-900 bg-gray-200"
									}`}
								>
									{selectedWorker.status}
								</span>
							</p>
							<p className="text-sm text-gray-500">{selectedWorker.role}</p>
						</div>
					</div>

					{/* Chat messages */}
					<div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
						{currentMessages.map((message) => {
							if (message.isDateSeparator) {
								return (
									<p key={message.id} className="text-gray-400 text-xs text-center py-2">
										{message.timestamp}
									</p>
								);
							}

							return (
								<div
									key={message.id}
									className={`flex gap-2 ${
										message.sender === "user" ? "justify-end" : "justify-start"
									}`}
								>
									{message.sender === "worker" && (
										<div className="bg-gray-300 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs">
											{selectedWorker.initials}
										</div>
									)}
									<div
										className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
											message.sender === "user"
												? "bg-blue-500 text-white"
												: "bg-white border border-gray-200"
										}`}
									>
										<p className="text-sm">{message.text}</p>
										<p
											className={`text-xs mt-1 ${
												message.sender === "user" ? "text-blue-100" : "text-gray-500"
											}`}
										>
											{message.timestamp}
										</p>
									</div>
									{message.sender === "user" && (
										<div className="bg-blue-500 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white">
											You
										</div>
									)}
								</div>
							);
						})}

						{/* Typing indicator */}
						{isTyping && (
							<div className="flex gap-2 justify-start">
								<div className="bg-gray-300 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs">
									{selectedWorker.initials}
								</div>
								<div className="bg-white border border-gray-200 px-3 py-2 rounded-lg">
									<div className="flex space-x-1">
										<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										></div>
										<div
											className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										></div>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Message input */}
					<div className="border-t border-gray-200 bg-white p-4">
						<form onSubmit={handleSendMessage} className="flex gap-3 items-end">
							<div className="flex-1">
								<textarea
									value={currentMessage}
									onChange={(e) => setCurrentMessage(e.target.value)}
									onKeyPress={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSendMessage(e);
										}
									}}
									placeholder={`Type your message to ${selectedWorker.name}...`}
									className="w-full border border-gray-300 rounded-md py-3 px-4 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									rows={windowWidth < 400 ? "1" : "2"}
									disabled={selectedWorker.status === "offline"}
								/>
								{selectedWorker.status === "offline" && (
									<p className="text-xs text-red-500 mt-1">
										This healthcare worker is currently offline
									</p>
								)}
							</div>
							<div className="flex flex-col space-y-2">
								<button
									type="button"
									className="bg-gray-100 hover:bg-gray-200 p-3 rounded-md transition-colors"
								>
									<CiMicrophoneOn size={20} />
								</button>
								<button
									type="button"
									className="bg-gray-100 hover:bg-gray-200 p-3 rounded-md transition-colors"
								>
									<GiSpeaker size={18} />
								</button>
								<button
									type="submit"
									disabled={
										!currentMessage.trim() || selectedWorker.status === "offline" || isTyping
									}
									className={`p-3 rounded-md transition-colors ${
										!currentMessage.trim() || selectedWorker.status === "offline" || isTyping
											? "bg-gray-300 cursor-not-allowed"
											: "bg-blue-500 hover:bg-blue-600 text-white"
									}`}
								>
									<FaRegPaperPlane size={18} />
								</button>
							</div>
						</form>
					</div>
				</section>
			</main>
		</section>
	);
};

export default HealthCare;
