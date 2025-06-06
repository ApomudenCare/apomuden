import { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft
} from "lucide-react";

function CommunicationsTab({ patients, patientCommunications, selectedPatient }) {
  const [activeView, setActiveView] = useState("history"); // "history" or "chat"
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "healthcare_worker",
      message: "Hello! This is the communication history with the patient.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 2,
      sender: "patient",
      message: "I've been experiencing some side effects from the new medication.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 3,
      sender: "healthcare_worker",
      message: "I'm sorry to hear that. Can you describe the side effects in detail?",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 4,
      sender: "patient",
      message: "I've been feeling dizzy and nauseous, especially in the morning.",
      timestamp: "15:16",
      isRead: true
    },
    {
      id: 5,
      sender: "healthcare_worker",
      message: "Thank you for letting me know. I'll make a note of this and discuss it with the doctor. In the meantime, try taking the medication with food.",
      timestamp: "15:17",
      isRead: false
    }
  ]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Sent": return "bg-blue-100 text-blue-800";
      case "Missed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCommunicationTypeIcon = (type) => {
    switch (type) {
      case "Phone Call": return <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case "SMS": return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "Email": return <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
      case "Emergency Contact": return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default: return <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "healthcare_worker",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isRead: false
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedPatientData = patients?.find(p => p.id === selectedPatient);

  const renderChatInterface = () => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center min-w-0 flex-1">
          <button 
            onClick={() => setActiveView("history")}
            className="mr-2 p-1 text-gray-500 hover:text-gray-700 sm:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base flex-shrink-0">
            {selectedPatientData?.name?.charAt(0)}
          </div>
          <div className="ml-2 sm:ml-3 min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
              {selectedPatientData?.name}
            </h4>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
        <div className="text-center">
          <span className="text-xs text-gray-500 bg-white px-2 sm:px-3 py-1 rounded-full">
            Communication History
          </span>
        </div>
        
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'healthcare_worker' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
              msg.sender === 'healthcare_worker' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-900 border border-gray-200'
            }`}>
              <p className="text-sm break-words">{msg.message}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                msg.sender === 'healthcare_worker' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                <span className="text-xs">{msg.timestamp}</span>
                {msg.sender === 'healthcare_worker' && (
                  <div className="flex">
                    <div className={`w-3 h-3 ${msg.isRead ? 'text-blue-200' : 'text-blue-300'}`}>
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows="1"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded hidden sm:block">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded hidden sm:block">
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-lg transition-colors ${
                newMessage.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryView = () => (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900">
            {selectedPatientData?.name}'s Communications
          </h4>
          <p className="text-sm text-gray-500">
            Recent patient interactions and messages
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveView("chat")}
            className="bg-green-600 text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-green-700 flex-1 sm:flex-none justify-center"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Chat
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-blue-700 flex-1 sm:flex-none justify-center">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {patientCommunications
          ?.filter(comm => comm.patientId === selectedPatient)
          .map(comm => (
            <div key={comm.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 flex justify-between items-center">
              <div className="flex items-center min-w-0 flex-1">
                <div className="flex-shrink-0">
                  {getCommunicationTypeIcon(comm.type)}
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <h5 className="text-sm font-medium text-gray-900 truncate">{comm.title}</h5>
                  <p className="text-xs text-gray-500 truncate sm:whitespace-normal">
                    {comm.type} - {comm.date} by {comm.staff}
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-shrink-0 ml-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2 sm:mr-3 ${getStatusBadgeClass(comm.status)}`}>
                  {comm.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}

        {(!patientCommunications || patientCommunications.filter(comm => comm.patientId === selectedPatient).length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">No communication history found for this patient.</p>
            <button 
              onClick={() => setActiveView("chat")}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 w-full sm:w-auto"
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {selectedPatient ? (
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col">
          {/* Tab Header - Hidden on mobile when in chat view */}
          <div className={`flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 ${
            activeView === "chat" ? "hidden sm:flex" : "flex"
          }`}>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveView("history")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  activeView === "history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveView("chat")}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  activeView === "chat"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Live Chat
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 hidden sm:block">
              Patient Communications
            </h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeView === "chat" ? (
              <div className="h-full">
                {renderChatInterface()}
              </div>
            ) : (
              <div className="p-3 sm:p-4 h-full overflow-y-auto">
                {renderHistoryView()}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-48 sm:h-64 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Patient Communications</h4>
          <p className="text-sm text-gray-500">Select a patient to view their communication history</p>
        </div>
      )}
    </div>
  );
}

export default CommunicationsTab;