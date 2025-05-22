import { Search, User } from "lucide-react";

function PatientsTab({ patients, selectedPatient, setSelectedPatient }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Stable": return "bg-green-100 text-green-800";
      case "Improving": return "bg-blue-100 text-blue-800";
      case "Critical": return "bg-red-100 text-red-800";
      case "New": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex space-x-6">
      {/* Patient List */}
      <div className="w-1/3 bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient List</h3>
        <p className="text-sm text-gray-500 mb-4">Select a patient to view their details</p>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Filter patients..."
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full text-sm"
          />
        </div>

        {/* Scrollable patient list */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`flex items-center px-3 py-3 rounded-md cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                selectedPatient === patient.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{patient.name}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{patient.age}, {patient.gender}</p>
                <p className="text-sm font-medium text-gray-800">{patient.condition}</p>
                <p className="text-xs text-gray-400">Updated {patient.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Details */}
      <div className="w-2/3 bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Details</h3>
        <p className="text-sm text-gray-500 mb-4">View and manage patient information</p>

        {selectedPatient ? (
          <div className="p-4">
            <p>Patient details content would be displayed here.</p>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Patient Selected</h4>
            <p className="text-sm text-gray-500">Select a patient from the list to view their details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientsTab;