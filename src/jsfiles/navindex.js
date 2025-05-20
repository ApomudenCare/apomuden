import { CgDanger } from "react-icons/cg";
import { CiHome, CiStethoscope } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";

const navigation = [
	
	{
		name: "Home",
		icon: CiHome,
	},
	{
		name: "Patient",
		icon: FaUsers,
	},
	{
		name: "HealthCare Worker",
		icon: CiStethoscope,
	},
	{
		name: "Emergency",
		icon: CgDanger,
	},
];

export default navigation;
