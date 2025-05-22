import { useState } from "react";
import { AlertTriangle, Phone, MessageSquare, MapPin, Ambulance, Volume2, Loader2, CheckCircle, HeartPulse } from "lucide-react";

const Emergency = () => {
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [emergencyStatus, setEmergencyStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("symptoms");
  const [selectedBodyPart, setSelectedBodyPart] = useState("Head");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const bodyParts = ["Head", "Chest", "Abdomen", "Heart", "General", "Pain"];
  
  const symptomsMap = {
    Head: ["Headache", "Dizziness", "Blurred vision", "Ear pain", "Sore throat"],
    Chest: ["Chest pain", "Shortness of breath"],
    Abdomen: ["Stomach ache", "Nausea"],
    Heart: ["Palpitations", "Fainting"],
    General: ["Fever", "Fatigue"],
    Pain: ["Back pain", "Joint pain"],
  };

  const emergencyPhrases = [
    "I need help immediately",
    "I can't breathe",
    "I have chest pain",
    "I'm feeling dizzy",
    "I'm having a seizure",
    "I'm bleeding heavily",
    "I have severe pain",
    "I can't move",
    "I'm having an allergic reaction",
    "I need medication",
  ];

  const handleEmergencyAlert = () => {
    setEmergencyTriggered(true);
    setEmergencyStatus("sending");

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setEmergencyStatus("sent");

      // Simulate acknowledgment after 3 seconds
      setTimeout(() => {
        setEmergencyStatus("acknowledged");

        // Reset after 5 more seconds
        setTimeout(() => {
          setEmergencyTriggered(false);
          setEmergencyStatus("idle");
          setProgress(0);
        }, 5000);
      }, 3000);
    }, 2000);
  };

  const handleTextToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech not supported in your browser");
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Main Emergency Card */}
      <div className="bg-white border border-red-200 rounded-lg shadow-sm">
        <div className="bg-red-50 px-6 py-4 border-b border-red-200 rounded-t-lg">
          <h2 className="text-red-700 text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Assistance
          </h2>
          <p className="text-gray-600 text-sm mt-1">Use this interface to request immediate medical assistance</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emergency Alert Section */}
            <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg bg-red-50">
              <HeartPulse className={`h-16 w-16 text-red-600 ${emergencyStatus === "idle" ? "animate-pulse" : ""}`} />
              <h3 className="text-xl font-bold text-center">Request Immediate Help</h3>
              <p className="text-center text-gray-600">
                Press the button below to alert medical staff of an emergency situation
              </p>

              {emergencyStatus === "idle" ? (
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 px-4 rounded-lg font-semibold transition-colors"
                  onClick={handleEmergencyAlert}
                >
                  <AlertTriangle className="h-5 w-5 mr-2 inline" />
                  Emergency Alert
                </button>
              ) : (
                <div className="w-full space-y-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <button 
                    className="w-full bg-red-600 text-white text-lg py-6 px-4 rounded-lg font-semibold opacity-75 cursor-not-allowed"
                    disabled
                  >
                    {emergencyStatus === "sending" && (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin inline" />
                        Sending Alert...
                      </>
                    )}
                    {emergencyStatus === "sent" && (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2 inline" />
                        Alert Sent
                      </>
                    )}
                    {emergencyStatus === "acknowledged" && (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2 inline" />
                        Help is Coming
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                <Phone className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <h3 className="font-bold">Emergency Contacts</h3>
                  <p className="text-gray-600">Call emergency services</p>
                  <button className="text-red-600 font-medium hover:underline">Call 112</button>
                </div>
                <button
                  className="p-2 border rounded hover:bg-gray-50"
                  onClick={() => handleTextToSpeech("Calling emergency services at 112")}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                <Ambulance className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <h3 className="font-bold">Ambulance Service</h3>
                  <p className="text-gray-600">Request an ambulance</p>
                  <button className="text-red-600 font-medium hover:underline">Call Ambulance</button>
                </div>
                <button
                  className="p-2 border rounded hover:bg-gray-50"
                  onClick={() => handleTextToSpeech("Calling ambulance service")}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                <MapPin className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <h3 className="font-bold">Your Location</h3>
                  <p className="text-gray-600">Share your location with emergency services</p>
                  <button className="text-red-600 font-medium hover:underline">Share Location</button>
                </div>
                <button
                  className="p-2 border rounded hover:bg-gray-50"
                  onClick={() => handleTextToSpeech("Sharing your current location with emergency services")}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            <button
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === "symptoms"
                  ? "border-red-500 text-red-600 bg-red-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("symptoms")}
            >
              <AlertTriangle className="h-4 w-4" />
              Report Emergency Symptoms
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === "communication"
                  ? "border-red-500 text-red-600 bg-red-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("communication")}
            >
              <MessageSquare className="h-4 w-4" />
              Emergency Communication
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "symptoms" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Report Emergency Symptoms</h3>
                <p className="text-gray-600 text-sm mb-4">Quickly select symptoms to report in an emergency situation</p>
              </div>

              {/* Body Part Selector */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setSelectedBodyPart(part)}
                    className={`border p-2 rounded text-sm font-medium transition-colors duration-200 ${
                      selectedBodyPart === part 
                        ? "bg-red-600 text-white border-red-600" 
                        : "bg-white hover:bg-red-50 hover:border-red-300"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>

              {/* Symptoms for Selected Body Part */}
              <div className="mb-4 border rounded p-4">
                <h4 className="font-medium mb-2">Select symptoms for {selectedBodyPart}:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {symptomsMap[selectedBodyPart].map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`border p-2 rounded text-sm transition-colors duration-200 ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white hover:bg-red-50 hover:border-red-300"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Symptoms */}
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h4 className="font-medium">Selected Symptoms:</h4>
                <p className="text-sm mt-1">
                  {selectedBodyPart}: {selectedSymptoms.join(", ") || "None"}
                </p>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors">
                Submit Symptoms
              </button>
            </div>
          )}

          {activeTab === "communication" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Emergency Communication</h3>
                <p className="text-gray-600 text-sm mb-4">Use pre-defined phrases for emergency communication</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyPhrases.map((phrase, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 p-3 border rounded-lg text-left hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                    onClick={() => handleTextToSpeech(phrase)}
                  >
                    <Volume2 className="h-4 w-4 flex-shrink-0" />
                    <span>{phrase}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergency;