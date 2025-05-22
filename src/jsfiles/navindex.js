import { CgDanger } from "react-icons/cg";
import { CiHome, CiStethoscope, CiUser } from "react-icons/ci";
import { FaUser} from "react-icons/fa";

const navigation = [
	
	{
		name: "Home",
		icon: CiHome,
		path: '/'
	},
	{
		name: "Patient",
		icon: CiUser,
		path: '/patient'
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
