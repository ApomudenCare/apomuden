import {
  FileText,
  AlertTriangle,
  Clock,
  Download
} from "lucide-react";

function RecordsTab({ patients, patientRecords, selectedPatient }) {
  const getRecordTypeIcon = (type) => {
    switch (type) {
      case "Diagnosis": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case "Medication": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "Examination": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
      case "Lab Results": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case "Emergency": return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default: return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Patient Records</h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">View and manage patient medical records</p>

      {selectedPatient ? (
        <div>
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-md font-medium text-gray-900 truncate">
                {patients.find(p => p.id === selectedPatient)?.name}'s Records
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {patients.find(p => p.id === selectedPatient)?.age}, 
                {patients.find(p => p.id === selectedPatient)?.gender} - 
                {patients.find(p => p.id === selectedPatient)?.condition}
              </p>
            </div>
            <button className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm flex items-center justify-center sm:justify-start flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden xs:inline">View </span>History
            </button>
          </div>

          <div className="space-y-2">
            {patientRecords
              .filter(record => record.patientId === selectedPatient)
              .map(record => (
                <div key={record.id} className="border border-gray-200 rounded-md p-2 sm:p-3 hover:bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-start sm:items-center flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                      {getRecordTypeIcon(record.type)}
                    </div>
                    <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                      <h5 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{record.title}</h5>
                      <p className="text-xs text-gray-500 truncate sm:whitespace-normal">
                        <span className="sm:hidden">{record.type}</span>
                        <span className="hidden sm:inline">{record.type} - {record.date} by {record.doctor}</span>
                      </p>
                      <p className="text-xs text-gray-400 sm:hidden">
                        {record.date} • {record.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 justify-end sm:justify-start flex-shrink-0">
                    <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm px-2 py-1 rounded hover:bg-blue-50 flex-shrink-0">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100 flex-shrink-0">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {patientRecords.filter(record => record.patientId === selectedPatient).length === 0 && (
              <div className="text-center py-6 sm:py-8">
                <p className="text-sm sm:text-base text-gray-500">No records found for this patient.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-48 sm:h-64 flex flex-col items-center justify-center text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Patient Records</h4>
          <p className="text-xs sm:text-sm text-gray-500">Select a patient to view their medical records</p>
        </div>
      )}
    </div>
  );
}

export default RecordsTab;