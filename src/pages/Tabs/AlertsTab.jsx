// import {
//   Bell,
//   AlertTriangle,
//   FileText,
//   Calendar
// } from "lucide-react";

// function AlertsTab({ patientAlerts }) {
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "Critical": return "bg-red-100 text-red-800";
//       case "Attention": return "bg-yellow-100 text-yellow-800";
//       case "Normal": return "bg-blue-100 text-blue-800";
//       case "Information": return "bg-gray-100 text-gray-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getAlertTypeIcon = (type) => {
//     switch (type) {
//       case "Emergency": return <AlertTriangle className="w-5 h-5 text-red-500" />;
//       case "Medication": return <FileText className="w-5 h-5 text-yellow-500" />;
//       case "Appointment": return <Calendar className="w-5 h-5 text-blue-500" />;
//       case "Test Results": return <FileText className="w-5 h-5 text-green-500" />;
//       default: return <Bell className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-4">
//       <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Alerts</h3>
//       <p className="text-sm text-gray-500 mb-4">View and manage patient alerts and notifications</p>

//       <div className="space-y-4">
//         {patientAlerts
//           .sort((a, b) => {
//             // Sort by status priority (Critical first)
//             const statusPriority = { "Critical": 1, "Attention": 2, "Normal": 3, "Information": 4 };
//             return statusPriority[a.status] - statusPriority[b.status];
//           })
//           .map(alert => (
//             <div key={alert.id} 
//               className={`border rounded-md p-4 ${
//                 alert.status === "Critical" 
//                   ? "bg-red-50 border-red-200" 
//                   : alert.status === "Attention" 
//                     ? "bg-yellow-50 border-yellow-200" 
//                     : "bg-white border-gray-200"
//               }`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center">
//                   {getAlertTypeIcon(alert.type)}
//                   <h5 className={`ml-2 text-sm font-medium ${
//                     alert.status === "Critical" 
//                       ? "text-red-700" 
//                       : alert.status === "Attention" 
//                         ? "text-yellow-700" 
//                         : "text-gray-900"
//                   }`}>
//                     {alert.title}
//                   </h5>
//                 </div>
//                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusBadgeClass(alert.status)}`}>
//                   {alert.status}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-gray-500">{alert.date}</span>
//                 <div className="flex space-x-2">
//                   {alert.status === "Critical" && (
//                     <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm">
//                       Respond Now
//                     </button>
//                   )}
//                   <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     View Details
//                   </button>
//                   {alert.status === "Attention" && (
//                     <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                       Contact Patient
//                     </button>
//                   )}
//                   <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
//                     Dismiss
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
          
//         {patientAlerts.length === 0 && (
//           <div className="text-center py-8 border border-gray-200 rounded-md">
//             <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No alerts at this time</p>
//           </div>
//         )}
        
//         <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
//           View All Alerts
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AlertsTab;

import {
  Bell,
  AlertTriangle,
  FileText,
  Calendar,
  MoreVertical,
  X
} from "lucide-react";
import { useState } from "react";

function AlertsTab({ patientAlerts }) {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Critical": return "bg-red-100 text-red-800";
      case "Attention": return "bg-yellow-100 text-yellow-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      case "Information": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case "Emergency": return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case "Medication": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case "Appointment": return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case "Test Results": return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      default: return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const toggleDropdown = (alertId) => {
    setActiveDropdown(activeDropdown === alertId ? null : alertId);
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Patient Alerts</h3>
        <p className="text-xs sm:text-sm text-gray-500">View and manage patient alerts and notifications</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {patientAlerts
          .sort((a, b) => {
            // Sort by status priority (Critical first)
            const statusPriority = { "Critical": 1, "Attention": 2, "Normal": 3, "Information": 4 };
            return statusPriority[a.status] - statusPriority[b.status];
          })
          .map(alert => (
            <div key={alert.id} 
              className={`border rounded-md p-3 sm:p-4 transition-all duration-200 ${
                alert.status === "Critical" 
                  ? "bg-red-50 border-red-200" 
                  : alert.status === "Attention" 
                    ? "bg-yellow-50 border-yellow-200" 
                    : "bg-white border-gray-200"
              }`}
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center flex-1 min-w-0">
                  {getAlertTypeIcon(alert.type)}
                  <h5 className={`ml-2 text-sm sm:text-base font-medium truncate ${
                    alert.status === "Critical" 
                      ? "text-red-700" 
                      : alert.status === "Attention" 
                        ? "text-yellow-700" 
                        : "text-gray-900"
                  }`}>
                    {alert.title}
                  </h5>
                </div>
                
                <div className="flex items-center space-x-2 ml-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getStatusBadgeClass(alert.status)}`}>
                    {alert.status}
                  </span>
                  
                  {/* Mobile Menu Button */}
                  <div className="relative sm:hidden">
                    <button
                      onClick={() => toggleDropdown(alert.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                    
                    {/* Mobile Dropdown Menu */}
                    {activeDropdown === alert.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          {alert.status === "Critical" && (
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              Respond Now
                            </button>
                          )}
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            View Details
                          </button>
                          {alert.status === "Attention" && (
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Contact Patient
                            </button>
                          )}
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Alert Description */}
              <div className="mb-3">
                <p className={`text-xs sm:text-sm text-gray-600 ${
                  expandedAlert === alert.id ? '' : 'line-clamp-2 sm:line-clamp-none'
                }`}>
                  {alert.description}
                </p>
                
                {/* Mobile expand/collapse for long descriptions */}
                {alert.description.length > 100 && (
                  <button
                    onClick={() => toggleExpanded(alert.id)}
                    className="sm:hidden text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    {expandedAlert === alert.id ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>

              {/* Alert Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <span className="text-xs text-gray-500">{alert.date}</span>
                
                {/* Desktop Action Buttons */}
                <div className="hidden sm:flex space-x-2">
                  {alert.status === "Critical" && (
                    <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors">
                      Respond Now
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  {alert.status === "Attention" && (
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition-colors">
                      Contact Patient
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Dismiss
                  </button>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex sm:hidden space-x-2 overflow-x-auto pb-1">
                  {alert.status === "Critical" && (
                    <button className="bg-red-600 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0">
                      Respond Now
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0">
                    View Details
                  </button>
                  {alert.status === "Attention" && (
                    <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0">
                      Contact
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm whitespace-nowrap flex-shrink-0">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
          
        {/* Empty State */}
        {patientAlerts.length === 0 && (
          <div className="text-center py-8 sm:py-12 border border-gray-200 rounded-md">
            <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm sm:text-base text-gray-500">No alerts at this time</p>
          </div>
        )}
        
        {/* View All Button */}
        <button className="w-full bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
          View All Alerts
        </button>
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-0 sm:hidden" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}

export default AlertsTab;