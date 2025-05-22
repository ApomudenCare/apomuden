import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import PatientDashboard from "./pages/PatientDashboard";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/patient" element={<PatientDashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
