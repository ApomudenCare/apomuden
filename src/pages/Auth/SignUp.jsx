// import { useState, useRef } from "react";
// import {
//   ArrowLeft,
//   Eye,
//   EyeOff,
//   Loader2,
//   Stethoscope,
//   UserPlus,
//   Upload,
// } from "lucide-react";

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [selectedRole, setSelectedRole] = useState("");
//   const formRef = useRef(null);

//   const showToast = (title, description, variant = "default") => {
//     setToast({ title, description, variant });
//     setTimeout(() => setToast(null), 4000);
//   };

//   const validateForm = (formData) => {
//     const username = formData.get("username");
//     const firstName = formData.get("firstName");
//     const lastName = formData.get("lastName");
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const confirmPassword = formData.get("confirmPassword");
//     const telephoneNumber = formData.get("telephoneNumber");
//     const role = formData.get("role");
//     const specialty = formData.get("specialty");
//     const profilePicture = formData.get("profilePicture");

//     if (!username || !firstName || !lastName || !email || !password || !telephoneNumber || !role) {
//       showToast(
//         "Missing Information",
//         "Please fill in all required fields.",
//         "destructive"
//       );
//       return false;
//     }

//     // Medical specialty is required for nurse and doctor roles only
//     if ((role === "nurse" || role === "doctor") && !specialty) {
//       showToast(
//         "Missing Medical Specialty",
//         "Medical specialty is required for nurses and doctors.",
//         "destructive"
//       );
//       return false;
//     }

//     if (!profilePicture) {
//       showToast(
//         "Profile Picture Required",
//         "Please upload a profile picture.",
//         "destructive"
//       );
//       return false;
//     }

//     if (password !== confirmPassword) {
//       showToast(
//         "Password Mismatch",
//         "Passwords do not match. Please try again.",
//         "destructive"
//       );
//       return false;
//     }

//     if (password.length < 6) {
//       showToast(
//         "Weak Password",
//         "Password must be at least 6 characters long.",
//         "destructive"
//       );
//       return false;
//     }

//     // Basic phone number validation
//     const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
//     if (!phoneRegex.test(telephoneNumber)) {
//       showToast(
//         "Invalid Phone Number",
//         "Please enter a valid telephone number.",
//         "destructive"
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//       if (!allowedTypes.includes(file.type)) {
//         showToast(
//           "Invalid File Type",
//           "Please upload a valid image file (JPEG, PNG, or GIF).",
//           "destructive"
//         );
//         return;
//       }
      
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         showToast(
//           "File Too Large",
//           "Please upload an image smaller than 5MB.",
//           "destructive"
//         );
//         return;
//       }
      
//       setProfilePicture(file);
//     }
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Create FormData from the form manually
//     const formData = new FormData();
//     const formElement = formRef.current;
    
//     // Get all form inputs
//     const inputs = formElement.querySelectorAll('input, select');
//     inputs.forEach(input => {
//       if (input.type === 'file') {
//         if (input.files[0]) {
//           formData.append(input.name, input.files[0]);
//         }
//       } else {
//         formData.append(input.name, input.value);
//       }
//     });

//     if (!validateForm(formData)) return;

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       // Mock registration - in real app, this would call an API
//       const newUser = {
//         id: Math.random().toString(36).substr(2, 9),
//         username: formData.get("username"),
//         email: formData.get("email"),
//         name: `${formData.get("firstName")} ${formData.get("lastName")}`,
//         firstName: formData.get("firstName"),
//         lastName: formData.get("lastName"),
//         telephoneNumber: formData.get("telephoneNumber"),
//         role: formData.get("role"),
//         specialty: formData.get("specialty") || null, // Specialty might not be provided for patients
//         profilePicture: formData.get("profilePicture")?.name,
//         verified: false,
//       };

//       console.log("New user registered:", newUser);
//       console.log("FormData entries:", Object.fromEntries(formData));

//       showToast(
//         "Account Created Successfully",
//         `Welcome to HealthCare Portal, ${newUser.name}!`
//       );

//       // Reset form
//       const inputs = formRef.current.querySelectorAll('input, select');
//       inputs.forEach(input => {
//         if (input.type === 'file') {
//           input.value = '';
//         } else {
//           input.value = '';
//         }
//       });
//       setProfilePicture(null);
//       setSelectedRole("");
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Stethoscope className="h-6 w-6 text-emerald-600" />
//               <span className="text-xl font-bold text-gray-900 dark:text-white">
//                 HealthCare Portal
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Toast Notification */}
//       {toast && (
//         <div className="fixed top-4 right-4 z-50">
//           <div
//             className={`p-4 rounded-lg shadow-lg max-w-sm ${
//               toast.variant === "destructive"
//                 ? "bg-red-50 border border-red-200 text-red-800"
//                 : "bg-green-50 border border-green-200 text-green-800"
//             }`}
//           >
//             <div className="font-medium">{toast.title}</div>
//             <div className="text-sm mt-1">{toast.description}</div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-md space-y-6">
//           <div className="text-center">
//             <button
//               onClick={() => window.history.back()}
//               className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Home
//             </button>

//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
//                 <Stethoscope className="h-8 w-8 text-emerald-600" />
//               </div>
//             </div>

//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               HealthCare Portal Registration
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Create your account to access the healthcare portal
//             </p>
//           </div>

//           {/* Signup Card */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//             <div className="p-6">
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Create Account
//                 </h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                   Fill in your information to get started
//                 </p>
//               </div>

//               <div ref={formRef} className="space-y-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="username"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Username *
//                   </label>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     placeholder="johndoe123"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="firstName"
//                       className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       First Name *
//                     </label>
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       type="text"
//                       placeholder="John"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="lastName"
//                       className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       Last Name *
//                     </label>
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       type="text"
//                       placeholder="Doe"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="email"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Email Address *
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="user@example.com"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="telephoneNumber"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Telephone Number *
//                   </label>
//                   <input
//                     id="telephoneNumber"
//                     name="telephoneNumber"
//                     type="tel"
//                     placeholder="+1234567890"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="role"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Role *
//                   </label>
//                   <select
//                     id="role"
//                     name="role"
//                     required
//                     value={selectedRole}
//                     onChange={handleRoleChange}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                   >
//                     <option value="">Select your role</option>
//                     <option value="patient">Patient</option>
//                     <option value="nurse">Nurse</option>
//                     <option value="doctor">Doctor</option>
//                   </select>
//                 </div>

//                 {/* Medical Specialty - Only show for nurse and doctor roles */}
//                 {(selectedRole === "nurse" || selectedRole === "doctor") && (
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="specialty"
//                       className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       Medical Specialty *
//                     </label>
//                     <select
//                       id="specialty"
//                       name="specialty"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                     >
//                       <option value="">Select your specialty</option>
//                       <option value="cardiology">Cardiology</option>
//                       <option value="dermatology">Dermatology</option>
//                       <option value="emergency-medicine">Emergency Medicine</option>
//                       <option value="family-medicine">Family Medicine</option>
//                       <option value="internal-medicine">Internal Medicine</option>
//                       <option value="neurology">Neurology</option>
//                       <option value="oncology">Oncology</option>
//                       <option value="orthopedics">Orthopedics</option>
//                       <option value="pediatrics">Pediatrics</option>
//                       <option value="psychiatry">Psychiatry</option>
//                       <option value="radiology">Radiology</option>
//                       <option value="surgery">Surgery</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="profilePicture"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Profile Picture *
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="profilePicture"
//                       name="profilePicture"
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/gif"
//                       required
//                       onChange={handleProfilePictureChange}
//                       className="hidden"
//                     />
//                     <label
//                       htmlFor="profilePicture"
//                       className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-emerald-500 transition-colors"
//                     >
//                       <div className="text-center">
//                         <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400">
//                           {profilePicture ? profilePicture.name : "Click to upload profile picture"}
//                         </span>
//                         <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Password *
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a strong password"
//                       required
//                       className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="confirmPassword"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Confirm Password *
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm your password"
//                       required
//                       className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleSignup}
//                   disabled={isLoading}
//                   className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Create Account
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <button
//                 onClick={() => window.location.href = '/login'}
//                 className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//             © 2025 HealthCare Portal. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Signup;
import { useState, useRef } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
  UserPlus,
  Upload,
} from "lucide-react";
import { apiSignUp } from '../../Services/auth'; // Adjusted this path

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // This state holds the File object
  const [selectedRole, setSelectedRole] = useState("");
  const formRef = useRef(null);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 4000);
  };

  // Modified validateForm to accept a JavaScript Map for easier access
  const validateForm = (formDataMap) => {
    const username = formDataMap.get("username");
    const firstName = formDataMap.get("firstName");
    const lastName = formDataMap.get("lastName");
    const email = formDataMap.get("email");
    const password = formDataMap.get("password");
    const confirmPassword = formDataMap.get("confirmPassword");
    const telephoneNumber = formDataMap.get("telephoneNumber");
    const role = formDataMap.get("role");
    const specialty = formDataMap.get("specialty"); // Get the specialty from the map
    const profilePictureFile = formDataMap.get("profilePicture"); // Get the file from the map

    if (!username || !firstName || !lastName || !email || !password || !telephoneNumber || !role) {
      showToast(
        "Missing Information",
        "Please fill in all required fields.",
        "destructive"
      );
      return false;
    }

    // IMPORTANT: Now, specialty is required for ALL roles based on your API docs.
    // If the backend should only require it for nurse/doctor, you need to update the backend.
    // For now, we validate its presence if it's explicitly required by the backend.
    if (!specialty) { // Check if specialty is empty/null/undefined
      showToast(
        "Missing Medical Specialty",
        "Medical specialty is required. Please select one or enter 'N/A' if not applicable.",
        "destructive"
      );
      return false;
    }


    // Validate profile picture presence using the file object from the map
    if (!profilePictureFile) {
      showToast(
        "Profile Picture Required",
        "Please upload a profile picture.",
        "destructive"
      );
      return false;
    }

    if (password !== confirmPassword) {
      showToast(
        "Password Mismatch",
        "Passwords do not match. Please try again.",
        "destructive"
      );
      return false;
    }

    if (password.length < 6) {
      showToast(
        "Weak Password",
        "Password must be at least 6 characters long.",
        "destructive"
      );
      return false;
    }

    // Basic phone number validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(telephoneNumber)) {
      showToast(
        "Invalid Phone Number",
        "Please enter a valid telephone number.",
        "destructive"
      );
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(
        "Invalid Email",
        "Please enter a valid email address.",
        "destructive"
      );
      return false;
    }

    // Additional file validations already in handleProfilePictureChange, but good to have here too
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (profilePictureFile && !allowedTypes.includes(profilePictureFile.type)) {
      showToast(
        "Invalid File Type",
        "Please upload a valid image file (JPEG, PNG, or GIF).",
        "destructive"
      );
      return false;
    }
    if (profilePictureFile && profilePictureFile.size > 5 * 1024 * 1024) { // Max 5MB
      showToast(
        "File Too Large",
        "Please upload an image smaller than 5MB.",
        "destructive"
      );
      return false;
    }


    return true;
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        showToast(
          "Invalid File Type",
          "Please upload a valid image file (JPEG, PNG, or GIF).",
          "destructive"
        );
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast(
          "File Too Large",
          "Please upload an image smaller than 5MB.",
          "destructive"
        );
        return;
      }
      
      setProfilePicture(file); // Store the actual file object
    } else {
        setProfilePicture(null); // Clear if no file selected
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const resetForm = () => {
    if (formRef.current) {
        formRef.current.reset(); // Resets all form fields
    }
    setProfilePicture(null);
    setSelectedRole("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Create a temporary map to hold form data for client-side validation
    const validationDataMap = new Map();
    const formElement = formRef.current;
    if (formElement) {
        const inputs = formElement.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'file') {
                validationDataMap.set(input.name, profilePicture); // Use the state for validation
            } else {
                validationDataMap.set(input.name, input.value);
            }
        });
        // Ensure specialty is always in the map, even if not rendered/selected
        if (!validationDataMap.has("specialty")) {
            validationDataMap.set("specialty", ""); // Send empty string if not provided
        }
    }

    if (!validateForm(validationDataMap)) return; // Validate using the map

    setIsLoading(true);

    try {
      // Create FormData directly for the API call with actual file object
      const signupFormData = new FormData();
      signupFormData.append("username", validationDataMap.get("username"));
      signupFormData.append("firstName", validationDataMap.get("firstName"));
      signupFormData.append("lastName", validationDataMap.get("lastName"));
      signupFormData.append("email", validationDataMap.get("email"));
      signupFormData.append("password", validationDataMap.get("password"));
      signupFormData.append("telephoneNumber", validationDataMap.get("telephoneNumber"));
      signupFormData.append("role", validationDataMap.get("role"));
      
      // Always append specialty, even if it's an empty string
      signupFormData.append("specialty", validationDataMap.get("specialty"));
      
      // Append the actual File object from state
      if (profilePicture) {
        signupFormData.append("profilePicture", profilePicture);
      }

      // Call your API signup function with FormData
      const response = await apiSignUp(signupFormData);

      // Handle successful registration
      if (response.data) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        showToast(
          "Account Created Successfully",
          `Welcome to HealthCare Portal! Please check your email to verify your account.`,
          "success"
        );

        resetForm();

        setTimeout(() => {
          if (response.data.token) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/login';
          }
        }, 2000);
      }

    } catch (error) {
      console.error("Signup error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data.message || "Invalid registration data. Please check your information.";
        } else if (status === 409) {
          errorMessage = "User already exists. Please try with different email or username.";
        } else if (status === 422) {
          // IMPORTANT CHANGE: Extract detailed error messages from the 'details' array
          if (data && Array.isArray(data.details) && data.details.length > 0) {
            // Attempt to map over details and get message or msg, or a generic error
            errorMessage = data.details.map(detail => {
                // Check common properties for error messages
                if (detail.message) return detail.message;
                if (detail.msg) return detail.msg;
                // If the error object has a 'param' or 'field' property, include it
                if (detail.param) return `Validation error for ${detail.param}`;
                if (detail.field) return `Validation error for ${detail.field}`;
                return "Validation error"; // Fallback if no specific message is found
            }).join(", ");
          } else {
            errorMessage = data.message || "Please check your input data. (Server validation failed)";
          }
          // Log the full response data from the server for more details
          // Using JSON.stringify with null, 2 for pretty printing
          console.error("Server 422 response data (full):", JSON.stringify(data, null, 2));
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection and try again.";
      }

      showToast(
        "Registration Failed",
        errorMessage,
        "destructive"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                HealthCare Portal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-lg shadow-lg max-w-sm ${
              toast.variant === "destructive"
                ? "bg-red-50 border border-red-200 text-red-800"
                : toast.variant === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            <div className="font-medium">{toast.title}</div>
            <div className="text-sm mt-1">{toast.description}</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>

            <div className="flex justify-center mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              HealthCare Portal Registration
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create your account to access the healthcare portal
            </p>
          </div>

          {/* Signup Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Account
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fill in your information to get started
                </p>
              </div>

              <form onSubmit={handleSignup} ref={formRef} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username *
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe123"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="telephoneNumber"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Telephone Number *
                  </label>
                  <input
                    id="telephoneNumber"
                    name="telephoneNumber"
                    type="tel"
                    placeholder="+1234567890"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                {/* Medical Specialty - Now always rendered, but conditionally required by frontend validation */}
                <div className="space-y-2">
                  <label
                    htmlFor="specialty"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Medical Specialty *
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    required={selectedRole === "nurse" || selectedRole === "doctor"} // Frontend requires only for these roles
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select your specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="emergency-medicine">Emergency Medicine</option>
                    <option value="family-medicine">Family Medicine</option>
                    <option value="internal-medicine">Internal Medicine</option>
                    <option value="neurology">Neurology</option>
                    <option value="oncology">Oncology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="radiology">Radiology</option>
                    <option value="surgery">Surgery</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="profilePicture"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Profile Picture *
                  </label>
                  <div className="relative">
                    <input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      required
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePicture"
                      className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-emerald-500 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {profilePicture ? profilePicture.name : "Click to upload profile picture"}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/login")}
                className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 HealthCare Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Signup;
