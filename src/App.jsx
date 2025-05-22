import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import HealthcareWorker from "./pages/HealthcareWorker";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/healthcareworker" element={<HealthcareWorker/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
