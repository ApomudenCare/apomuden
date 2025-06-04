// import { BrowserRouter, Route, Routes } from "react-router";
// import "./App.css";
// import HomePage from "./pages/HomePage";

// import HealthcareWorker from "./pages/HealthcareWorker";

// import PatientDashboard from "./pages/PatientDashboard";
// import Emergency from "./pages/Emergency";
// import Welcome from "./pages/Auth/Welcome";
// import Signup from "./pages/Auth/SignUp";
// import Login from "./pages/Auth/Login";

// function App() {
// 	return (
// 		<>
// 			<BrowserRouter>
// 				<Routes>
// 					<Route path="/" element={<HomePage />} />
// 					<Route path='/welcome' element={<Welcome/>}/>
// 					<Route path="/login" element={<Login/>} />
// 					<Route path="/signup" element={<Signup/>} />

// 					<Route path="/healthcareworker" element={<HealthcareWorker/>}/>
// 					<Route path="/emergency" element={<Emergency/>}/>

// 					<Route path="/patient" element={<PatientDashboard />} />

// 				</Routes>
// 			</BrowserRouter>
// 		</>
// 	);
// }

// export default App;

import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import "./App.css";

import HomePage from "./pages/HomePage";
import HealthcareWorker from "./pages/HealthcareWorker";
import PatientDashboard from "./pages/PatientDashboard";
import Emergency from "./pages/Emergency";
import Welcome from "./pages/Auth/Welcome";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <header
        style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <BrowserRouter>
        <Routes>
          {/* Show Sign-In UI if not logged in, otherwise go to HomePage */}
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <HomePage />
                </SignedIn>
                <SignedOut>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    <SignIn redirectUrl="/" />
                  </div>
                </SignedOut>
              </>
            }
          />

          {/* Optional Sign-Up route */}
          <Route
            path="/signup"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <SignUp redirectUrl="/" />
              </div>
            }
          />

          {/* Example extra pages */}
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/healthcareworker"
            element={
              <>
                <SignedIn>
                  <HealthcareWorker />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/emergency"
            element={
              <>
                <SignedIn>
                  <Emergency />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/patient"
            element={
              <>
                <SignedIn>
                  <PatientDashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

