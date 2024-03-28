import { FaUser } from "react-icons/fa";
import logo from "../../assets/task-logo.png"
export default function Navbar() {
    return (
        <div className="max-w-7xl mx-auto px-20 mb-4 pt-4">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-64" src={logo} alt="" />
                </div>
                <div><FaUser className="text-4xl border rounded-full"/></div>
            </div>
        </div>
    )
}
