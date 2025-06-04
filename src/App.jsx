import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";

import HealthcareWorker from "./pages/HealthcareWorker";

import PatientDashboard from "./pages/PatientDashboard";
import Emergency from "./pages/Emergency";
import Welcome from "./pages/Auth/Welcome";
import Signup from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/welcome' element={<Welcome/>}/>
					<Route path="/login" element={<Login/>} />
					<Route path="/signup" element={<Signup/>} />

					

					<Route path="/healthcareworker" element={<HealthcareWorker/>}/>
					<Route path="/emergency" element={<Emergency/>}/>

					<Route path="/patient" element={<PatientDashboard />} />

				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
