// import React from "react";
// import healthworker from "../../jsfiles/healthworker";
// import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
// import { FaRegPaperPlane } from "react-icons/fa";
// import { GiSpeaker } from "react-icons/gi";

// const HealthCare = () => {
// 	const statusdot = (status) => {
// 		switch (status) {
// 			case "online":
// 				return "bg-green-500";
// 			case "busy":
// 				return "bg-yellow-500";

// 			default:
// 				return "bg-gray-400";
// 		}
// 	};

// 	const textColor = (color) => {
// 		switch (color) {
// 			case "online":
// 				return "text-green-500";

// 			case "busy":
// 				return "text-yellow-500";

// 			default:
// 				return "text-gray-400";
// 		}
// 	};

// 	return (
// 		<section className="border border-gray-200 rounded-md overflow-hidden ">
// 			<div className="px-4 py-2 border-b border-gray-200">
// 				<h1 className="text-2xl font-semibold  rounded-md">Chat with HealthCare Workers</h1>
// 				<p className="text-sm text-gray-500 mb-2">
// 					Direct communication with doctors and healthcare professionals
// 				</p>
// 			</div>

// 			<main className="flex h-full">
// 				<aside className="w-1/3 border-r border-gray-200 overflow-y-auto">
// 					<div className="border-b border-gray-200 px-4 py-2">
// 						<h1 className="text-lg font-semibold">HealthCare Workers</h1>
// 						<p className="text-sm text-gray-500">Select a healthworker to chat with</p>
// 					</div>

// 					{healthworker.map((worker, index) => (
// 						<div
// 							key={index}
// 							className="flex items-start gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-300"
// 						>
// 							<div className="relative">
// 								<div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
// 									{worker.initials}
// 								</div>
// 								<span
// 									className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusdot(
// 										worker.status
// 									)}`}
// 								></span>
// 							</div>
// 							{/* second div for name */}
// 							<div className="flex-1">
// 								<div className="flex justify-between items-center">
// 									<p className="font-medium ">{worker.name}</p>
// 									<p className="text-xs text-gray-500">{worker.lastSeen}</p>
// 								</div>
// 								<p className="text-base text-gray-500">{worker.role}</p>
// 								<p className={`${textColor(worker.status)} font-medium text-sm`}>{worker.status}</p>
// 							</div>
// 						</div>
// 					))}
// 				</aside>

// 				{/* Chat section */}
// 				<section className="flex-1 flex flex-col">
// 					{/* heading */}
// 					<div className="flex gap-3 p-4 border-b border-gray-300">
// 						<div className="bg-gray-400 w-10 h-10 rounded-full flex justify-center items-center">
// 							<p>KN</p>
// 						</div>
// 						<div className="">
// 							<p className="font-medium flex gap-x-2">
// 								Dr. Kwame Nkrumah
// 								<span className="text-sm text-green-900 bg-green-300 rounded-full px-2">
// 									Online
// 								</span>
// 							</p>
// 							<p className="text-sm text-gray-500">General Physician</p>
// 						</div>
// 					</div>

// 					{/* chat messages */}
// 					<div className="p-4 space-y-2 overflow-y-auto border-b border-gray-300 mb-10 ">
// 						<p className="text-gray-400 text-xs text-center">Yesterday</p>
// 						<div className="flex gap-x-2">
// 							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
// 							<p className="bg-gray-100 p-2 rounded-md max-w-xs">How can I help you today</p>
// 						</div>
// 						<p className="bg-gray-200 text-gray-500 text-xs text-center rounded-full max-w-12 py-1 mx-auto">
// 							Today
// 						</p>
// 						<div className="flex gap-2">
// 							<p className="bg-green-700 text-white ml-auto p-2 rounded-md max-w-xs">
// 								I have been experiencing severe headache
// 							</p>
// 							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
// 						</div>
// 						<div className="flex gap-2">
// 							<p className="bg-green-700 text-white ml-auto p-2 rounded-md max-w-xs">
// 								I have been experiencing severe headache
// 							</p>
// 							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
// 						</div>
// 					</div>

// 					{/* Submit section */}
// 					<div className="flex gap-x-3 items-center ">
// 						<textarea
// 							name=""
// 							id=""
// 							placeholder="Type your message here"
// 							className="w-full border border-gray-300 rounded-md mx-4  py-3 px-5 pr-12 outline-none resize-none"
// 						></textarea>
// 						<div className="w-12 flex flex-col space-y-2 mx-4">
// 							<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
// 								<CiMicrophoneOn size={25} />
// 							</div>
// 							<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
// 								<GiSpeaker size={20} />
// 							</div>
// 							<div className="bg-[#8dc9b5] text-white p-3 flex justify-center items-center rounded-md">
// 								<FaRegPaperPlane size={20} />
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</main>
// 		</section>
// 	);
// };

// export default HealthCare;

import React, { useState } from "react";
import { Mic, Volume2, Send, Languages, ArrowLeftRight } from "lucide-react";

// Mock healthworker data
const healthworker = [
  {
    name: "Dr. Kwame Nkrumah",
    role: "General Physician",
    status: "online",
    initials: "KN",
    lastSeen: "Now"
  },
  {
    name: "Dr. Ama Serwaa",
    role: "Pediatrician",
    status: "busy",
    initials: "AS",
    lastSeen: "5 min ago"
  },
  {
    name: "Dr. Kofi Asante",
    role: "Cardiologist",
    status: "offline",
    initials: "KA",
    lastSeen: "1 hour ago"
  }
];

// Languages
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tw", name: "Twi", flag: "🇬🇭" },
  { code: "ee", name: "Ewe", flag: "🇬🇭" },
  { code: "gaa", name: "Ga", flag: "🇬🇭" },
  { code: "fat", name: "Fante", flag: "🇬🇭" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "dag", name: "Dagbani", flag: "🇬🇭" },
  { code: "ki", name: "Kikuyu", flag: "🇰🇪" },
  { code: "gur", name: "Gurune", flag: "🇬🇭" },
  { code: "luo", name: "Luo", flag: "🇰🇪" },
  { code: "mer", name: "Kimeru", flag: "🇰🇪" },
  { code: "kus", name: "Kusaal", flag: "🇬🇭" }
];

// Mock translation function (replace with actual translation API)
const translateText = async (text, fromLang, toLang) => {
  // This is a mock translation - in real implementation, use Google Translate API or similar
  const translations = {
    "How can I help you today": {
      tw: "Mɛyɛ dɛn atoa wo nnɛ?",
      fa: "Dɛn na mɛyɛ atoa wo nnɛ?",
      ga: "Ke mani gbɛ wɔ egbɛ?",
      ee: "Aleke mate ŋu akpe ɖe ŋuwò egbe?"
    },
    "I have been experiencing severe headache": {
      tw: "Manya ti yadeɛ kɛseɛ",
      fa: "Me ti yare kɛtse",
      ga: "Mi ta lɛ kɛ",
      ee: "Tame le vevem nam"
    }
  };
  
  // Simple mock translation logic
  if (translations[text] && translations[text][toLang]) {
    return translations[text][toLang];
  }
  
  return `[${toLang.toUpperCase()}] ${text}`;
};

const HealthCare = () => {
  const [translationMode, setTranslationMode] = useState(false);
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("tw");
  const [message, setMessage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "How can I help you today", sender: "doctor", time: "Yesterday" },
    { text: "I have been experiencing severe headache", sender: "user", time: "Today" }
  ]);

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

  const textColor = (color) => {
    switch (color) {
      case "online":
        return "text-green-500";
      case "busy":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  const handleTranslate = async () => {
    if (!message.trim()) return;
    
    setIsTranslating(true);
    try {
      const translated = await translateText(message, fromLanguage, toLanguage);
      setTranslatedMessage(translated);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedMessage("Translation failed");
    }
    setIsTranslating(false);
  };

  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    if (translatedMessage) {
      setMessage(translatedMessage);
      setTranslatedMessage(message);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      text: message,
      sender: "user",
      time: "Now"
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleTranslateAndSend = async () => {
    if (!message.trim()) return;
    
    setIsTranslating(true);
    try {
      const translated = await translateText(message, fromLanguage, toLanguage);
      
      // Add translated message to chat
      const newMessage = {
        text: translated,
        sender: "user",
        time: "Now",
        original: message,
        isTranslated: true
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      // Clear inputs
      setMessage("");
      setTranslatedMessage("");
    } catch (error) {
      console.error("Translation error:", error);
    }
    setIsTranslating(false);
  };

  return (
    <section className="border border-gray-200 rounded-md overflow-hidden">
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold rounded-md">Chat with HealthCare Workers</h1>
            <p className="text-sm text-gray-500 mb-2">
              Direct communication with doctors and healthcare professionals
            </p>
          </div>
          <button
            onClick={() => setTranslationMode(!translationMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              translationMode 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Languages />
            Translation Mode
          </button>
        </div>
      </div>

      <main className="flex h-full">
        <aside className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="border-b border-gray-200 px-4 py-2">
            <h1 className="text-lg font-semibold">HealthCare Workers</h1>
            <p className="text-sm text-gray-500">Select a healthworker to chat with</p>
          </div>

          {healthworker.map((worker, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-300"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
                  {worker.initials}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusdot(
                    worker.status
                  )}`}
                ></span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{worker.name}</p>
                  <p className="text-xs text-gray-500">{worker.lastSeen}</p>
                </div>
                <p className="text-base text-gray-500">{worker.role}</p>
                <p className={`${textColor(worker.status)} font-medium text-sm`}>{worker.status}</p>
              </div>
            </div>
          ))}
        </aside>

        <section className="flex-1 flex flex-col">
          <div className="flex gap-3 p-4 border-b border-gray-300">
            <div className="bg-gray-400 w-10 h-10 rounded-full flex justify-center items-center">
              <p>KN</p>
            </div>
            <div>
              <p className="font-medium flex gap-x-2">
                Dr. Kwame Nkrumah
                <span className="text-sm text-green-900 bg-green-300 rounded-full px-2">
                  Online
                </span>
              </p>
              <p className="text-sm text-gray-500">General Physician</p>
            </div>
          </div>

          {/* Translation Panel */}
          {translationMode && (
            <div className="bg-blue-50 border-b border-blue-200 p-6">
              <h3 className="text-blue-800 font-semibold text-lg mb-4">
                Translate from {languages.find(l => l.code === fromLanguage)?.name} to:
              </h3>
              
              <div className="mb-4">
                <select
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white mb-3"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                
                <div className="flex justify-center mb-3">
                  <button
                    onClick={swapLanguages}
                    className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
                    title="Swap languages"
                  >
                    <ArrowLeftRight className="text-blue-600" size={20} />
                  </button>
                </div>
                
                <select
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white"
                >
                  {languages.filter(lang => lang.code !== fromLanguage).map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Enter a ${languages.find(l => l.code === fromLanguage)?.name} word or phrase`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                  rows="2"
                />
              </div>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleTranslate}
                  disabled={!message.trim() || isTranslating}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium flex items-center gap-2"
                >
                  {isTranslating ? "Translating..." : "Translate"}
                </button>
                
                <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg">
                  <Mic size={20} />
                </button>
              </div>
              
              {translatedMessage && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Translation Preview:</h4>
                    <span className="text-xs text-gray-500">
                      {languages.find(l => l.code === toLanguage)?.name}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-3 p-3 bg-gray-50 rounded-md">
                    {translatedMessage}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newMessage = {
                          text: translatedMessage,
                          sender: "user",
                          time: "Now",
                          original: message,
                          isTranslated: true
                        };
                        setChatMessages(prev => [...prev, newMessage]);
                        setMessage("");
                        setTranslatedMessage("");
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium flex items-center gap-2"
                    >
                      <Send size={16} />
                      Send Translation
                    </button>
                    <button
                      onClick={() => setTranslatedMessage("")}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
              
              {!translatedMessage && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-400">Enter text above and click "Translate" to see preview</p>
                </div>
              )}
            </div>
          )}

          <div className="p-4 space-y-2 overflow-y-auto border-b border-gray-300 mb-10 flex-1">
            {chatMessages.map((msg, index) => (
              <div key={index}>
                {index === 0 && <p className="text-gray-400 text-xs text-center">Yesterday</p>}
                {index === 1 && <p className="bg-gray-200 text-gray-500 text-xs text-center rounded-full max-w-12 py-1 mx-auto">Today</p>}
                
                <div className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'doctor' && <div className="bg-gray-200 w-5 h-5 rounded-full"></div>}
                  
                  <div className={`max-w-xs ${msg.sender === 'user' ? 'order-1' : ''}`}>
                    <p className={`p-2 rounded-md ${
                      msg.sender === 'user' 
                        ? 'bg-green-700 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      {msg.text}
                    </p>
                    
                    {msg.isTranslated && (
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        Original: "{msg.original}"
                      </p>
                    )}
                  </div>
                  
                  {msg.sender === 'user' && <div className="bg-gray-200 w-5 h-5 rounded-full order-2"></div>}
                </div>
                
                {msg.time === 'Now' && index === chatMessages.length - 1 && (
                  <p className="text-gray-400 text-xs text-center mt-1">{msg.time}</p>
                )}
              </div>
            ))}
          </div>

          {!translationMode && (
            <div className="flex gap-x-3 items-end p-4">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here"
                  className="w-full border border-gray-300 rounded-md py-3 px-5 outline-none resize-none"
                  rows="2"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md hover:bg-gray-300 cursor-pointer">
                  <Mic size={25} />
                </div>
                <div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md hover:bg-gray-300 cursor-pointer">
                  <Volume2 size={20} />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="bg-[#8dc9b5] text-white p-3 flex justify-center items-center rounded-md hover:bg-[#7bb8a3] disabled:bg-gray-400 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </section>
  );
};

export default HealthCare;