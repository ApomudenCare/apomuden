import {
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

function CommunicationsTab({ patients, patientCommunications, selectedPatient }) {
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
      case "Phone Call": return <Phone className="w-5 h-5 text-blue-500" />;
      case "SMS": return <MessageSquare className="w-5 h-5 text-green-500" />;
      case "Email": return <Mail className="w-5 h-5 text-purple-500" />;
      case "Emergency Contact": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Communications</h3>
      <p className="text-sm text-gray-500 mb-4">View and manage patient communications</p>

      {selectedPatient ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-md font-medium text-gray-900">
                {patients.find(p => p.id === selectedPatient)?.name}'s Communications
              </h4>
              <p className="text-sm text-gray-500">
                Recent patient interactions and messages
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {patientCommunications
              .filter(comm => comm.patientId === selectedPatient)
              .map(comm => (
                <div key={comm.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    {getCommunicationTypeIcon(comm.type)}
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-900">{comm.title}</h5>
                      <p className="text-xs text-gray-500">{comm.type} - {comm.date} by {comm.staff}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-3 ${getStatusBadgeClass(comm.status)}`}>
                      {comm.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

            {patientCommunications.filter(comm => comm.patientId === selectedPatient).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No communication history found for this patient.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Patient Communications</h4>
          <p className="text-sm text-gray-500">Select a patient to view their communication history</p>
        </div>
      )}
    </div>
  );
}

export default CommunicationsTab;