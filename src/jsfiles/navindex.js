import { CgDanger } from "react-icons/cg";
import { CiHome, CiStethoscope, CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";

const navigation = [
	{
		name: "Home",
		icon: HiOutlineHome,
		path: "/",
	},
	{
		name: "Patient",
		icon: CiUser,
		path: "/patient",
	},
	{
		name: "HealthCare Worker",
		icon: CiStethoscope,
		path: "/healthcareworker",
	},
	{
		name: "Emergency",
		icon: CgDanger,
		path: "/emergency",
	},
];

export default navigation;
